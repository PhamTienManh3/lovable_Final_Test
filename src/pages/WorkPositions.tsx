import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkPositionsTable } from "@/components/work-positions/WorkPositionsTable";
import { CreatePositionDrawer } from "@/components/work-positions/CreatePositionDrawer";

const WorkPositions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: positions, isLoading, refetch } = useQuery({
    queryKey: ["work_positions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_positions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Danh sách vị trí làm việc (công tác) của giáo viên
            </h1>
            <p className="text-muted-foreground">
              Quản lý các vị trí công tác trong trường
            </p>
          </div>
          <Button onClick={() => setIsDrawerOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Tạo vị trí mới
          </Button>
        </div>

        <WorkPositionsTable positions={positions || []} isLoading={isLoading} />
        
        <CreatePositionDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onSuccess={() => {
            refetch();
            setIsDrawerOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default WorkPositions;

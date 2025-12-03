import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { WorkPositionsTable } from "@/components/work-positions/WorkPositionsTable";
import { CreatePositionSheet } from "@/components/work-positions/CreatePositionSheet";
import { AppLayout } from "@/components/layout/AppLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const WorkPositions = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    <AppLayout
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "Dữ liệu", href: "/work-positions" },
            { label: "Vị trí công tác" },
          ]}
        />
      }
    >
      <div className="bg-card rounded-lg border p-6">
        <div className="flex justify-end items-center gap-2 mb-4">
          <Button onClick={() => setIsSheetOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Tạo
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Làm mới
          </Button>
        </div>

        <WorkPositionsTable positions={positions || []} isLoading={isLoading} />
      </div>

      <CreatePositionSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSuccess={() => {
          refetch();
          setIsSheetOpen(false);
        }}
      />
    </AppLayout>
  );
};

export default WorkPositions;
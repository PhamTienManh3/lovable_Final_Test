import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TeachersTable } from "@/components/teachers/TeachersTable";

const Teachers = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: teachersData, isLoading } = useQuery({
    queryKey: ["teachers", page],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from("teachers")
        .select("*, work_positions(name)", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { data, count };
    },
  });

  const totalPages = teachersData?.count
    ? Math.ceil(teachersData.count / pageSize)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Danh sách giáo viên
            </h1>
            <p className="text-muted-foreground">
              Quản lý thông tin giáo viên trong hệ thống
            </p>
          </div>
          <Button onClick={() => navigate("/teachers/create")} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Tạo giáo viên mới
          </Button>
        </div>

        <TeachersTable
          teachers={teachersData?.data || []}
          isLoading={isLoading}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Teachers;

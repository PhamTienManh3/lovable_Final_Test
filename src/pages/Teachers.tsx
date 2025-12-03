import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Search } from "lucide-react";
import { TeachersTable } from "@/components/teachers/TeachersTable";
import { CreateTeacherSheet } from "@/components/teachers/CreateTeacherSheet";
import { AppLayout } from "@/components/layout/AppLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const Teachers = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data: teachersData, isLoading, refetch } = useQuery({
    queryKey: ["teachers", page, pageSize],
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
    <AppLayout
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "Giáo viên" },
          ]}
        />
      }
    >
      <div className="bg-card rounded-lg border p-6">
        <div className="flex justify-end items-center gap-2 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm thông tin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64 h-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Tải lại
          </Button>
          <Button onClick={() => setIsSheetOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Tạo mới
          </Button>
        </div>

        <TeachersTable
          teachers={teachersData?.data || []}
          isLoading={isLoading}
          currentPage={page}
          totalPages={totalPages}
          totalCount={teachersData?.count || 0}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </div>

      <CreateTeacherSheet
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

export default Teachers;
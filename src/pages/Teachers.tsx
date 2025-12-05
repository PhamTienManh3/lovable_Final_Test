import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Search } from "lucide-react";
import { TeachersTable } from "@/components/teachers/TeachersTable";
import { CreateTeacherSheet } from "@/components/teachers/CreateTeacherSheet";
import { AppLayout } from "@/components/layout/AppLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { teacherService } from "@/services/mockTeacherData";

const Teachers = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  // Using mock service - Replace with actual API call to your MongoDB backend
  const { data: teachersData, isLoading, refetch } = useQuery({
    queryKey: ["teachers", page, pageSize, search],
    queryFn: async () => {
      // This simulates fetching from MongoDB backend
      // Replace this with: const response = await fetch('/api/teachers?page=...')
      const result = await teacherService.getTeachers(page, pageSize, search || undefined);
      return { data: result.data, count: result.total };
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

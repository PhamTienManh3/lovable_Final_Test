import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeacherDetailSheet } from "./TeacherDetailSheet";

interface Teacher {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  academic_degree: string | null;
  work_positions: { name: string } | null;
  work_position_id: string | null;
  address: string | null;
  status: string;
  date_of_birth: string | null;
  id_number: string | null;
}

interface TeachersTableProps {
  teachers: Teacher[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const TeachersTable = ({
  teachers,
  isLoading,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: TeachersTableProps) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <>
      <div className="space-y-4">
        <div className="bg-card rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-28 font-semibold text-foreground">Mã</TableHead>
                <TableHead className="font-semibold text-foreground">Giáo viên</TableHead>
                <TableHead className="font-semibold text-foreground">Trình độ (cao nhất)</TableHead>
                <TableHead className="w-24 font-semibold text-foreground">Bộ môn</TableHead>
                <TableHead className="font-semibold text-foreground">TT Công tác</TableHead>
                <TableHead className="font-semibold text-foreground">Địa chỉ</TableHead>
                <TableHead className="w-28 font-semibold text-foreground">Trạng thái</TableHead>
                <TableHead className="w-24 font-semibold text-foreground">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Chưa có giáo viên nào
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {teacher.id.substring(0, 10)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          {teacher.avatar_url ? (
                            <img
                              src={teacher.avatar_url}
                              alt={teacher.full_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{teacher.full_name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {teacher.email || "Chưa có email"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {teacher.phone || ""}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Bậc: {teacher.academic_degree || "Chưa có"}</div>
                        <div className="text-muted-foreground text-xs">
                          Chuyên ngành: —
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">N/A</TableCell>
                    <TableCell>{teacher.work_positions?.name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {teacher.address || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={
                          teacher.status === "active"
                            ? "bg-success hover:bg-success text-success-foreground"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {teacher.status === "active" ? "Đang công tác" : "Ngừng"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground"
                        onClick={() => setSelectedTeacher(teacher)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm text-muted-foreground">
            Tổng: {totalCount}
          </span>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              &lt;
            </Button>
            
            {pages.map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              &gt;
            </Button>
          </div>

          <Select
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
            <SelectTrigger className="w-[110px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / trang</SelectItem>
              <SelectItem value="20">20 / trang</SelectItem>
              <SelectItem value="50">50 / trang</SelectItem>
              <SelectItem value="100">100 / trang</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TeacherDetailSheet
        open={!!selectedTeacher}
        onOpenChange={(open) => !open && setSelectedTeacher(null)}
        teacher={selectedTeacher}
      />
    </>
  );
};
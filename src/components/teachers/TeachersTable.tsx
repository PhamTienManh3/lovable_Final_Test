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
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Teacher {
  id: string;
  full_name: string;
  email: string | null;
  academic_degree: string | null;
  work_positions: { name: string } | null;
  address: string | null;
  status: string;
}

interface TeachersTableProps {
  teachers: Teacher[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TeachersTable = ({
  teachers,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: TeachersTableProps) => {
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

  return (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">STT</TableHead>
            <TableHead>Mã</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Chưa có giáo viên nào
              </TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher, index) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {teacher.id.substring(0, 8).toUpperCase()}
                </TableCell>
                <TableCell className="font-medium">{teacher.full_name}</TableCell>
                <TableCell>
                  <Badge
                    variant={teacher.status === "active" ? "default" : "secondary"}
                    className={
                      teacher.status === "active"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {teacher.status === "active" ? "Hoạt động" : "Ngừng"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {teacher.work_positions?.name || "—"} • {teacher.academic_degree || "Chưa có"} • {teacher.email || "Chưa có email"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Trang {currentPage} / {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

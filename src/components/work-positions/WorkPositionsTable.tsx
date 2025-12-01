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

interface WorkPosition {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: string;
}

interface WorkPositionsTableProps {
  positions: WorkPosition[];
  isLoading: boolean;
}

export const WorkPositionsTable = ({
  positions,
  isLoading,
}: WorkPositionsTableProps) => {
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
          {positions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Chưa có vị trí công tác nào
              </TableCell>
            </TableRow>
          ) : (
            positions.map((position, index) => (
              <TableRow key={position.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-mono text-sm font-semibold">
                  {position.code}
                </TableCell>
                <TableCell className="font-medium">{position.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={position.status === "active" ? "default" : "secondary"}
                    className={
                      position.status === "active"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {position.status === "active" ? "Hoạt động" : "Ngừng"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {position.description || "—"}
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
    </div>
  );
};

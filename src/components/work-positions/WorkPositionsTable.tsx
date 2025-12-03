import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
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
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-16 font-semibold text-foreground">STT</TableHead>
            <TableHead className="w-24 font-semibold text-foreground">Mã</TableHead>
            <TableHead className="font-semibold text-foreground">Tên</TableHead>
            <TableHead className="w-32 font-semibold text-foreground">Trạng thái</TableHead>
            <TableHead className="font-semibold text-foreground">Mô tả</TableHead>
            <TableHead className="w-16"></TableHead>
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
              <TableRow key={position.id} className="hover:bg-muted/20">
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                <TableCell className="font-medium">{position.code}</TableCell>
                <TableCell>{position.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={
                      position.status === "active"
                        ? "bg-success hover:bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {position.status === "active" ? "Hoạt động" : "Ngừng"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {position.description || "—"}
                </TableCell>
                <TableCell>
                  <button className="p-1.5 hover:bg-muted rounded transition-colors">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
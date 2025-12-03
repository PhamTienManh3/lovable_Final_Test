import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  breadcrumb?: React.ReactNode;
}

export const AppHeader = ({ breadcrumb }: AppHeaderProps) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {breadcrumb}
        <span className="text-sm text-muted-foreground">
          {dateStr} {timeStr}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">Admin</div>
            <Badge variant="default" className="text-xs px-1.5 py-0 bg-primary">
              ADMIN
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
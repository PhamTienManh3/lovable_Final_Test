import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Calendar, CreditCard } from "lucide-react";

interface Teacher {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  academic_degree: string | null;
  work_positions: { name: string } | null;
  address: string | null;
  status: string;
  date_of_birth?: string | null;
  id_number?: string | null;
}

interface TeacherDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
}

export const TeacherDetailSheet = ({
  open,
  onOpenChange,
  teacher,
}: TeacherDetailSheetProps) => {
  if (!teacher) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[450px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Thông tin giáo viên</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Avatar and basic info */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              {teacher.avatar_url ? (
                <img
                  src={teacher.avatar_url}
                  alt={teacher.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{teacher.full_name}</h3>
              <p className="text-muted-foreground">{teacher.work_positions?.name || "Chưa có vị trí"}</p>
              <Badge
                variant="default"
                className={
                  teacher.status === "active"
                    ? "bg-success hover:bg-success text-success-foreground mt-2"
                    : "bg-muted text-muted-foreground mt-2"
                }
              >
                {teacher.status === "active" ? "Đang công tác" : "Ngừng công tác"}
              </Badge>
            </div>
          </div>

          {/* Detail info */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Thông tin liên hệ
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.email || "Chưa có email"}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.phone || "Chưa có số điện thoại"}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.address || "Chưa có địa chỉ"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Thông tin cá nhân
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Ngày sinh: {teacher.date_of_birth || "Chưa có"}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>CCCD: {teacher.id_number || "Chưa có"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Trình độ học vấn
            </h4>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="font-medium">{teacher.academic_degree || "Chưa có thông tin"}</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            Mã giáo viên: {teacher.id}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

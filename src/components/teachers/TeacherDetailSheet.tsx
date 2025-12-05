import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Mail, Phone, MapPin, Calendar, CreditCard, GraduationCap, Briefcase } from "lucide-react";

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
  work_position_id?: string | null;
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
  // Fetch all work positions for this teacher
  const { data: teacherPositions } = useQuery({
    queryKey: ["teacher_work_positions", teacher?.id],
    queryFn: async () => {
      if (!teacher?.id) return [];
      const { data, error } = await supabase
        .from("teacher_work_positions")
        .select("work_position_id, work_positions(id, code, name)")
        .eq("teacher_id", teacher.id);
      if (error) throw error;
      return data;
    },
    enabled: !!teacher?.id && open,
  });

  if (!teacher) return null;

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "Chưa có";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  // Get all position names
  const positionNames = teacherPositions?.length
    ? teacherPositions.map((tp: any) => tp.work_positions?.name).filter(Boolean).join(", ")
    : teacher.work_positions?.name || "Chưa có vị trí";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[450px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Thông tin giáo viên</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-6">
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
              <p className="text-muted-foreground">{positionNames}</p>
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

          {/* Contact info */}
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

          {/* Personal info */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Thông tin cá nhân
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Ngày sinh: {formatDate(teacher.date_of_birth)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>CCCD: {teacher.id_number || "Chưa có"}</span>
              </div>
            </div>
          </div>

          {/* Work positions */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Vị trí công tác
            </h4>
            
            <div className="space-y-2">
              {teacherPositions && teacherPositions.length > 0 ? (
                teacherPositions.map((tp: any) => (
                  <div key={tp.work_position_id} className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{tp.work_positions?.code} - {tp.work_positions?.name}</span>
                  </div>
                ))
              ) : teacher.work_positions?.name ? (
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{teacher.work_positions.name}</span>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Chưa có vị trí công tác</p>
              )}
            </div>
          </div>

          {/* Academic degree */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Trình độ học vấn
            </h4>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{teacher.academic_degree || "Chưa có thông tin"}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            Mã giáo viên: {teacher.id.slice(0, 8)}
          </div>
        </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
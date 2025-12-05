import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Mail, Phone, MapPin, Calendar, CreditCard, GraduationCap, Briefcase, Clock } from "lucide-react";
import { TeacherFromBackend, teacherService, formatDegree } from "@/services/mockTeacherData";

interface TeacherDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: TeacherFromBackend | null;
}

export const TeacherDetailSheet = ({
  open,
  onOpenChange,
  teacher,
}: TeacherDetailSheetProps) => {
  if (!teacher) return null;

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "Chưa có";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  // Get positions for teacher
  const positions = teacherService.getTeacherPositions(teacher.positionIds);
  const positionNames = positions.length > 0 
    ? positions.map(p => p.name).join(", ") 
    : "Chưa có vị trí";

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
                {teacher.avatarUrl ? (
                  <img
                    src={teacher.avatarUrl}
                    alt={teacher.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{teacher.fullName}</h3>
                <p className="text-sm text-muted-foreground">Mã: {teacher.code}</p>
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
                  <span>Ngày sinh: {formatDate(teacher.dateOfBirth)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>CCCD: {teacher.idNumber || "Chưa có"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Ngày vào làm: {formatDate(teacher.startDate)}</span>
                </div>
              </div>
            </div>

            {/* Work positions */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Vị trí công tác
              </h4>
              
              <div className="space-y-2">
                {positions.length > 0 ? (
                  positions.map((position) => (
                    <div key={position.id} className="flex items-center gap-3">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{position.code} - {position.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Chưa có vị trí công tác</p>
                )}
              </div>
            </div>

            {/* Academic degrees */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Trình độ học vấn
              </h4>
              
              <div className="space-y-3">
                {teacher.degrees.length > 0 ? (
                  teacher.degrees.map((degree, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-4 w-4 text-muted-foreground mt-1" />
                        <div className="space-y-1">
                          <p className="font-medium">
                            {degree.type === "Bachelor" && "Cử nhân"}
                            {degree.type === "Master" && "Thạc sĩ"}
                            {degree.type === "Doctorate" && "Tiến sĩ"}
                          </p>
                          <p className="text-sm text-muted-foreground">{degree.school}</p>
                          <p className="text-sm">Chuyên ngành: {degree.major}</p>
                          <p className="text-sm text-muted-foreground">
                            Năm tốt nghiệp: {degree.year}
                            {degree.isGraduated && " ✓"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Chưa có thông tin</span>
                    </div>
                  </div>
                )}
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

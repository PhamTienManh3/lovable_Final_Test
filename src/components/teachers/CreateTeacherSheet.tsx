import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload, X, FolderOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CreateTeacherSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CreateTeacherSheet = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateTeacherSheetProps) => {
  const { toast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    phone: "",
    email: "",
    id_number: "",
    address: "",
    work_position_id: "",
    academic_degree: "",
    status: "active",
  });

  const { data: positions } = useQuery({
    queryKey: ["work_positions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_positions")
        .select("*")
        .eq("status", "active");
      if (error) throw error;
      return data;
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      let avatarUrl = null;

      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("teacher-avatars")
          .upload(fileName, avatarFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("teacher-avatars")
          .getPublicUrl(fileName);

        avatarUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from("teachers").insert({
        ...formData,
        avatar_url: avatarUrl,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Đã tạo giáo viên mới",
      });
      resetForm();
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      full_name: "",
      date_of_birth: "",
      phone: "",
      email: "",
      id_number: "",
      address: "",
      work_position_id: "",
      academic_degree: "",
      status: "active",
    });
    setAvatarFile(null);
    setAvatarPreview("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[700px] sm:max-w-[700px] p-0 overflow-y-auto">
        <SheetHeader className="p-4 border-b sticky top-0 bg-card z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="h-4 w-4" />
            </button>
            <SheetTitle className="text-base font-semibold">
              Tạo thông tin giáo viên
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* Personal Information Section */}
          <fieldset className="border border-border rounded-lg p-4">
            <legend className="px-2 text-sm font-medium text-primary flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Thông tin cá nhân
            </legend>

            <div className="grid grid-cols-[140px_1fr] gap-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-28 h-28 rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Upload className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-xs">Upload file</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("avatar-upload-sheet")?.click()}
                  type="button"
                  className="text-xs"
                >
                  Chọn ảnh
                </Button>
                <input
                  id="avatar-upload-sheet"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    <span className="text-destructive">*</span> Họ và tên
                  </Label>
                  <Input
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    <span className="text-destructive">*</span> Ngày sinh
                  </Label>
                  <Input
                    type="date"
                    placeholder="Chọn ngày sinh"
                    value={formData.date_of_birth}
                    onChange={(e) =>
                      setFormData({ ...formData, date_of_birth: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    <span className="text-destructive">*</span> Số điện thoại
                  </Label>
                  <Input
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    <span className="text-destructive">*</span> Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="example@school.edu.vn"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    <span className="text-destructive">*</span> Số CCCD
                  </Label>
                  <Input
                    placeholder="Nhập số CCCD"
                    value={formData.id_number}
                    onChange={(e) =>
                      setFormData({ ...formData, id_number: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    <span className="text-destructive">*</span> Địa chỉ
                  </Label>
                  <Input
                    placeholder="Địa chỉ thường trú"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Work Information Section */}
          <fieldset className="border border-border rounded-lg p-4">
            <legend className="px-2 text-sm font-medium text-primary flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Thông tin công tác
            </legend>

            <div className="space-y-1.5">
              <Label className="text-xs">
                <span className="text-destructive">*</span> Vị trí công tác
              </Label>
              <Select
                value={formData.work_position_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, work_position_id: value })
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Chọn các vị trí công tác" />
                </SelectTrigger>
                <SelectContent>
                  {positions?.map((position) => (
                    <SelectItem key={position.id} value={position.id}>
                      {position.code} - {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </fieldset>

          {/* Academic Information Section */}
          <fieldset className="border border-border rounded-lg p-4">
            <legend className="px-2 text-sm font-medium text-primary flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Học vị
            </legend>

            <div className="flex justify-end mb-3">
              <Button variant="outline" size="sm" className="text-xs">
                Thêm
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-xs font-medium">Bậc</TableHead>
                    <TableHead className="text-xs font-medium">Trường</TableHead>
                    <TableHead className="text-xs font-medium">Chuyên ngành</TableHead>
                    <TableHead className="text-xs font-medium">Trạng thái</TableHead>
                    <TableHead className="text-xs font-medium">Tốt nghiệp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <FolderOpen className="h-10 w-10 mb-2 opacity-50" />
                        <span className="text-sm">Trống</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </fieldset>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t p-4 flex justify-end">
          <Button
            onClick={() => createMutation.mutate()}
            disabled={!formData.full_name || createMutation.isPending}
            size="sm"
          >
            <Save className="h-4 w-4 mr-1.5" />
            {createMutation.isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
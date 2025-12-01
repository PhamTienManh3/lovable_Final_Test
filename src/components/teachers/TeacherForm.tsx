import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const TeacherForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      navigate("/teachers");
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="contact">Địa chỉ liên hệ</TabsTrigger>
            <TabsTrigger value="work">Thông tin công tác</TabsTrigger>
            <TabsTrigger value="academic">Trình độ chuyên môn</TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-[200px_1fr] gap-8 mb-6">
            <div className="space-y-4">
              <Label>Ảnh đại diện</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                  type="button"
                >
                  Chọn ảnh
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div>
              <TabsContent value="basic" className="space-y-4 mt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Họ và tên *</Label>
                    <Input
                      id="full_name"
                      placeholder="Nhập họ và tên"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Ngày sinh</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) =>
                        setFormData({ ...formData, date_of_birth: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id_number">Số CCCD</Label>
                    <Input
                      id="id_number"
                      placeholder="Nhập số CCCD"
                      value={formData.id_number}
                      onChange={(e) =>
                        setFormData({ ...formData, id_number: e.target.value })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea
                    id="address"
                    placeholder="Nhập địa chỉ đầy đủ"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="work" className="space-y-4 mt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work_position">Vị trí công tác</Label>
                    <Select
                      value={formData.work_position_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, work_position_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions?.map((position) => (
                          <SelectItem key={position.id} value={position.id}>
                            {position.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Ngừng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="academic_degree">Học vị</Label>
                  <Input
                    id="academic_degree"
                    placeholder="VD: Thạc sĩ, Tiến sĩ"
                    value={formData.academic_degree}
                    onChange={(e) =>
                      setFormData({ ...formData, academic_degree: e.target.value })
                    }
                  />
                </div>
              </TabsContent>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => navigate("/teachers")}
              type="button"
            >
              Hủy
            </Button>
            <Button
              onClick={() => createMutation.mutate()}
              disabled={!formData.full_name || createMutation.isPending}
            >
              {createMutation.isPending ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

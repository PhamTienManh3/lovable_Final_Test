import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface WorkPosition {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: string;
}

interface EditPositionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: WorkPosition | null;
  onSuccess: () => void;
}

export const EditPositionSheet = ({
  open,
  onOpenChange,
  position,
  onSuccess,
}: EditPositionSheetProps) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (position) {
      setCode(position.code);
      setName(position.name);
      setDescription(position.description || "");
      setIsActive(position.status === "active");
    }
  }, [position]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!position) return;
      const { error } = await supabase
        .from("work_positions")
        .update({
          code,
          name,
          description: description || null,
          status: isActive ? "active" : "inactive",
        })
        .eq("id", position.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Cập nhật vị trí công tác thành công");
      onSuccess();
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!position) return;
      const { error } = await supabase
        .from("work_positions")
        .delete()
        .eq("id", position.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Xóa vị trí công tác thành công");
      onSuccess();
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa");
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Chỉnh sửa vị trí công tác</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="code">Mã vị trí *</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="VD: GV, HP, HT..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên vị trí *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Giáo viên, Hiệu phó..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả chi tiết về vị trí..."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status">Trạng thái hoạt động</Label>
            <Switch
              id="status"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="flex-1"
            >
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
            </Button>
            <Button
              onClick={() => updateMutation.mutate()}
              disabled={!code || !name || updateMutation.isPending}
              className="flex-1"
            >
              {updateMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

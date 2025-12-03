import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatePositionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CreatePositionSheet = ({
  open,
  onOpenChange,
  onSuccess,
}: CreatePositionSheetProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    status: "active",
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("work_positions").insert(formData);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Đã tạo vị trí công tác mới",
      });
      setFormData({ code: "", name: "", description: "", status: "active" });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[450px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="h-4 w-4" />
            </button>
            <SheetTitle className="text-base font-semibold">
              Vị trí công tác
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm">
              <span className="text-destructive">*</span> Mã
            </Label>
            <Input
              id="code"
              placeholder="VD: GVBM"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              <span className="text-destructive">*</span> Tên
            </Label>
            <Input
              id="name"
              placeholder="VD: Giáo viên bộ môn"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm">
              <span className="text-destructive">*</span> Mô tả
            </Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về vị trí công tác"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">
              <span className="text-destructive">*</span> Trạng thái
            </Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "active" })}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded transition-colors",
                  formData.status === "active"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Hoạt động
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "inactive" })}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded transition-colors",
                  formData.status === "inactive"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Ngừng
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <Button
            onClick={() => createMutation.mutate()}
            disabled={!formData.code || !formData.name || createMutation.isPending}
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
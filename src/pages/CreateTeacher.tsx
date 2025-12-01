import { TeacherForm } from "@/components/teachers/TeacherForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreateTeacher = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/teachers")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tạo thông tin giáo viên
          </h1>
          <p className="text-muted-foreground">
            Nhập đầy đủ thông tin để tạo giáo viên mới
          </p>
        </div>

        <TeacherForm />
      </div>
    </div>
  );
};

export default CreateTeacher;

-- Create work_positions table
CREATE TABLE public.work_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  avatar_url TEXT,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  phone TEXT,
  email TEXT,
  id_number TEXT,
  address TEXT,
  work_position_id UUID REFERENCES public.work_positions(id),
  academic_degree TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.work_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth required for demo)
CREATE POLICY "Allow all access to work_positions" 
ON public.work_positions 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all access to teachers" 
ON public.teachers 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_work_positions_updated_at
BEFORE UPDATE ON public.work_positions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
BEFORE UPDATE ON public.teachers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for teacher avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('teacher-avatars', 'teacher-avatars', true);

-- Create policy for avatar uploads (public for demo)
CREATE POLICY "Allow all access to teacher avatars" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'teacher-avatars')
WITH CHECK (bucket_id = 'teacher-avatars');

-- Insert sample work positions
INSERT INTO public.work_positions (code, name, description, status)
VALUES
  ('TT3', 'Thạc sĩ giáo viên', 'Giáo viên với học vị Thạc sĩ', 'active'),
  ('GVBM', 'Giáo viên bộ môn', 'Giáo viên dạy bộ môn chính ở trường', 'active'),
  ('TBM', 'Trưởng bộ môn', 'Trưởng bộ môn giảng dạy tại trường', 'active'),
  ('HT', 'Hiệu trưởng', 'Hiệu trưởng của trường học', 'active'),
  ('HP', 'Hiệu phó', 'Phó hiệu trưởng hỗ trợ hiệu trưởng', 'active'),
  ('CBYT', 'Cán bộ Y tế', 'Cán bộ y tế trường học', 'active');
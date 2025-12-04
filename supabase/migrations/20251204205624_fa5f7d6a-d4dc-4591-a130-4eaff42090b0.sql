-- Create junction table for teacher-work position relationship (many-to-many)
CREATE TABLE public.teacher_work_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  work_position_id UUID NOT NULL REFERENCES public.work_positions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(teacher_id, work_position_id)
);

-- Enable RLS
ALTER TABLE public.teacher_work_positions ENABLE ROW LEVEL SECURITY;

-- Create policy for access
CREATE POLICY "Allow all access to teacher_work_positions"
ON public.teacher_work_positions
FOR ALL
USING (true)
WITH CHECK (true);
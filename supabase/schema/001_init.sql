-- 001_init.sql
-- Base tables for tutoring module

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text CHECK (role IN ('student', 'parent', 'tutor', 'admin')),
  host_user_id text UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Tutors table
CREATE TABLE IF NOT EXISTS public.tutors (
  user_id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  bio text,
  hourly_rate numeric,
  toggle_active boolean DEFAULT true,
  experience_years int,
  timezone text,
  updated_at timestamptz DEFAULT now()
);

-- Tutor subjects table
CREATE TABLE IF NOT EXISTS public.tutor_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES public.tutors(user_id) ON DELETE CASCADE,
  subject text,
  grades_min int, grades_max int
);

-- Sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES public.tutors(user_id),
  student_id uuid REFERENCES public.users(id),
  parent_id uuid REFERENCES public.users(id),
  status text,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz DEFAULT now()
);

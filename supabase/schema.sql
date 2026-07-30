-- Kariyer Pusulası SaaS Database Schema Setup
-- Run this script in Supabase Dashboard -> SQL Editor

-- 1. Create Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  work_type TEXT CHECK (work_type IN ('Remote', 'Hybrid', 'On-site')),
  salary TEXT,
  status TEXT NOT NULL CHECK (status IN ('saved', 'applied', 'contacted', 'interview', 'case_study', 'offer', 'rejected')),
  applied_date TIMESTAMPTZ,
  notes_count INT DEFAULT 0,
  target_role TEXT,
  priority TEXT CHECK (priority IN ('Düşük', 'Orta', 'Yüksek', 'Kritik')),
  job_url TEXT,
  contact_name TEXT,
  contact_email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  location TEXT,
  size TEXT,
  status TEXT CHECK (status IN ('Target', 'Researching', 'Applied', 'Contacted', 'Interviewed', 'Offer', 'Archived')),
  rating NUMERIC(3,2),
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Interviews Table
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  interview_stage TEXT NOT NULL,
  interview_type TEXT CHECK (interview_type IN ('Online', 'On-site', 'Phone', 'Hybrid')),
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration_minutes INT DEFAULT 45,
  interviewer_name TEXT,
  interviewer_role TEXT,
  meeting_link TEXT,
  location TEXT,
  result TEXT CHECK (result IN ('Pending', 'Passed', 'Failed', 'Offer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Applications
CREATE POLICY "Users can manage own applications" 
  ON public.applications FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Companies
CREATE POLICY "Users can manage own companies" 
  ON public.companies FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Interviews
CREATE POLICY "Users can manage own interviews" 
  ON public.interviews FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

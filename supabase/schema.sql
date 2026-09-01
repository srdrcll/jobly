-- ==============================================================================
-- JOBLY - PRODUCTION DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- ==============================================================================
-- Bu SQL dosyasını Supabase Dashboard -> SQL Editor alanına yapıştırıp "Run" butonuna basarak
-- tüm tabloları, indeksleri, RLS güvenlik politikalarını ve otomatik tetikleyicileri (triggers)
-- hatasız bir şekilde tek seferde oluşturabilirsiniz.
-- ==============================================================================

-- 0. Gerekli Eklentileri Etkinleştir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Otomatik updated_at güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 1. PROFİLLER TABLOSU (public.profiles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  title TEXT,
  bio TEXT,
  location TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  website TEXT,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi profilini görüntüleyebilir" ON public.profiles;
CREATE POLICY "Kullanıcılar kendi profilini görüntüleyebilir"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Kullanıcılar kendi profilini oluşturabilir" ON public.profiles;
CREATE POLICY "Kullanıcılar kendi profilini oluşturabilir"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Kullanıcılar kendi profilini güncelleyebilir" ON public.profiles;
CREATE POLICY "Kullanıcılar kendi profilini güncelleyebilir"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Otomatik Kullanıcı Profili Oluşturma Tetikleyicisi (Auth Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 2. ŞİRKETLER TABLOSU (public.companies)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  location TEXT,
  company_size TEXT,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  linkedin_url TEXT,
  career_page_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Target' CHECK (status IN ('Target', 'Researching', 'Applied', 'Contacted', 'Interviewed', 'Offer', 'Archived')),
  rating NUMERIC(3, 2) DEFAULT 3.00 CHECK (rating >= 0 AND rating <= 5),
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_companies_updated_at ON public.companies;
CREATE TRIGGER set_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_companies_user_id ON public.companies(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_status ON public.companies(status);
CREATE INDEX IF NOT EXISTS idx_companies_favorite ON public.companies(is_favorite);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi şirketlerini yönetebilir" ON public.companies;
CREATE POLICY "Kullanıcılar kendi şirketlerini yönetebilir"
  ON public.companies FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 3. BAŞVURULAR TABLOSU (public.applications)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  work_type TEXT CHECK (work_type IN ('Remote', 'Hybrid', 'On-site')),
  salary TEXT,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('saved', 'applied', 'contacted', 'interview', 'case_study', 'offer', 'rejected')),
  applied_date TIMESTAMPTZ DEFAULT NOW(),
  notes_count INT DEFAULT 0,
  target_role TEXT,
  priority TEXT DEFAULT 'Orta' CHECK (priority IN ('Düşük', 'Orta', 'Yüksek', 'Kritik')),
  job_url TEXT,
  contact_name TEXT,
  contact_email TEXT,
  source TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_applications_updated_at ON public.applications;
CREATE TRIGGER set_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_applied_date ON public.applications(applied_date DESC);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi başvurularını yönetebilir" ON public.applications;
CREATE POLICY "Kullanıcılar kendi başvurularını yönetebilir"
  ON public.applications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 4. MÜLAKATLAR TABLOSU (public.interviews)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'İK Görüşmesi',
  type TEXT DEFAULT 'Online' CHECK (type IN ('Online', 'On-site', 'Phone', 'Hybrid')),
  date DATE NOT NULL,
  time TIME NOT NULL DEFAULT '14:00',
  duration_minutes INT DEFAULT 45,
  interviewer_name TEXT,
  interviewer_role TEXT,
  meeting_link TEXT,
  location TEXT,
  prep_notes TEXT,
  interview_notes TEXT,
  result TEXT DEFAULT 'Pending' CHECK (result IN ('Pending', 'Passed', 'Failed', 'Offer')),
  follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_interviews_updated_at ON public.interviews;
CREATE TRIGGER set_interviews_updated_at
BEFORE UPDATE ON public.interviews
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_interviews_user_id ON public.interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_date ON public.interviews(date ASC);
CREATE INDEX IF NOT EXISTS idx_interviews_result ON public.interviews(result);

ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi mülakatlarını yönetebilir" ON public.interviews;
CREATE POLICY "Kullanıcılar kendi mülakatlarını yönetebilir"
  ON public.interviews FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 5. BELGELER VE DOKÜMANLAR (public.documents)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'CV',
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_documents_updated_at ON public.documents;
CREATE TRIGGER set_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi belgelerini yönetebilir" ON public.documents;
CREATE POLICY "Kullanıcılar kendi belgelerini yönetebilir"
  ON public.documents FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 6. HATIRLATICILAR (public.reminders)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON public.reminders(due_date ASC);

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi hatırlatıcılarını yönetebilir" ON public.reminders;
CREATE POLICY "Kullanıcılar kendi hatırlatıcılarını yönetebilir"
  ON public.reminders FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 7. ŞABLONLAR (public.templates)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Email',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_templates_updated_at ON public.templates;
CREATE TRIGGER set_templates_updated_at
BEFORE UPDATE ON public.templates
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_templates_user_id ON public.templates(user_id);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Kullanıcılar kendi şablonlarını yönetebilir" ON public.templates;
CREATE POLICY "Kullanıcılar kendi şablonlarını yönetebilir"
  ON public.templates FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

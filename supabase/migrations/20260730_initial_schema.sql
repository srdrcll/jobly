-- ====================================================================
-- KARİYER PUSULASI (CAREER COMPASS) - INITIAL DATABASE SCHEMA & RLS DDL
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to handle updated_at timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------
-- 1. TABLE: companies
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    industry TEXT,
    location TEXT,
    rating NUMERIC(3, 2) CHECK (rating >= 0 AND rating <= 5),
    open_positions_count INT DEFAULT 0,
    status TEXT CHECK (status IN ('Target', 'Researching', 'Applied', 'Contacted')),
    website TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for companies updated_at
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON companies
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for companies
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);

-- RLS: companies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own companies"
    ON companies FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own companies"
    ON companies FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companies"
    ON companies FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own companies"
    ON companies FOR DELETE
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 2. TABLE: applications
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT,
    work_type TEXT CHECK (work_type IN ('Remote', 'Hybrid', 'On-site')),
    salary TEXT,
    status TEXT NOT NULL CHECK (status IN ('saved', 'applied', 'interview', 'case_study', 'offer', 'rejected')),
    applied_date TIMESTAMPTZ DEFAULT NOW(),
    notes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for applications updated_at
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON applications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for applications
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_company_id ON applications(company_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- RLS: applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
    ON applications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications"
    ON applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
    ON applications FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
    ON applications FOR DELETE
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 3. TABLE: templates
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('CV / Özgeçmiş', 'Ön Mektup', 'Mülakat Takip', 'E-posta')),
    description TEXT,
    content TEXT,
    usage_count INT DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for templates updated_at
CREATE TRIGGER update_templates_updated_at
BEFORE UPDATE ON templates
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for templates
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);

-- RLS: templates
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own templates"
    ON templates FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates"
    ON templates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
    ON templates FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
    ON templates FOR DELETE
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 4. TABLE: reminders
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for reminders updated_at
CREATE TRIGGER update_reminders_updated_at
BEFORE UPDATE ON reminders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for reminders
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_application_id ON reminders(application_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON reminders(due_date ASC);

-- RLS: reminders
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reminders"
    ON reminders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
    ON reminders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
    ON reminders FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
    ON reminders FOR DELETE
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 5. TABLE: documents
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    file_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for documents updated_at
CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON documents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for documents
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_application_id ON documents(application_id);

-- RLS: documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents"
    ON documents FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
    ON documents FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
    ON documents FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
    ON documents FOR DELETE
    USING (auth.uid() = user_id);

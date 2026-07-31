import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';
import { Database } from './database';

export type ApplicationStatus = 
  | 'saved' 
  | 'applied'
  | 'contacted'
  | 'interview' 
  | 'case_study' 
  | 'offer' 
  | 'rejected';

export interface ApplicationStatusConfig {
  id: ApplicationStatus;
  label: string;
  labelEn: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  dotClass: string;
  iconName: string;
}

export type ThemeMode = 'dark' | 'light' | 'system';

export interface NavItem {
  title: string;
  href: string;
  icon: ComponentType<LucideProps>;
  badge?: string | number;
  description?: string;
  disabled?: boolean;
  tooltip?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

// Database Entity Types
export type DbApplication = Database['public']['Tables']['applications']['Row'];
export type DbApplicationInsert = Database['public']['Tables']['applications']['Insert'];
export type DbApplicationUpdate = Database['public']['Tables']['applications']['Update'];

export type DbCompany = Database['public']['Tables']['companies']['Row'];
export type DbCompanyInsert = Database['public']['Tables']['companies']['Insert'];
export type DbCompanyUpdate = Database['public']['Tables']['companies']['Update'];

export type DbTemplate = Database['public']['Tables']['templates']['Row'];
export type DbTemplateInsert = Database['public']['Tables']['templates']['Insert'];
export type DbTemplateUpdate = Database['public']['Tables']['templates']['Update'];

export type DbReminder = Database['public']['Tables']['reminders']['Row'];
export type DbReminderInsert = Database['public']['Tables']['reminders']['Insert'];
export type DbReminderUpdate = Database['public']['Tables']['reminders']['Update'];

export type DbDocument = Database['public']['Tables']['documents']['Row'];
export type DbDocumentInsert = Database['public']['Tables']['documents']['Insert'];
export type DbDocumentUpdate = Database['public']['Tables']['documents']['Update'];

export type DbInterview = Database['public']['Tables']['interviews']['Row'];
export type DbInterviewInsert = Database['public']['Tables']['interviews']['Insert'];
export type DbInterviewUpdate = Database['public']['Tables']['interviews']['Update'];


export interface CompanyItem {
  id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  location: string;
  rating: number;
  openPositionsCount: number;
  status: 'Target' | 'Researching' | 'Applied' | 'Contacted';
  website: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: 'CV / Özgeçmiş' | 'Ön Mektup' | 'Mülakat Takip' | 'E-posta';
  description: string;
  usageCount: number;
  updatedAt: string;
  tags: string[];
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  timeframe: string;
  icon: ComponentType<LucideProps>;
}

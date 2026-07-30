import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

export type ApplicationStatus = 
  | 'saved' 
  | 'applied' 
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
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

export interface ApplicationItem {
  id: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  salary?: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  notesCount: number;
}

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

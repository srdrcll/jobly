import { DbApplication } from '@/types';

export interface KpiMetrics {
  total: number;
  active: number;
  interviews: number;
  offers: number;
  rejections: number;
  successRate: number;
}

/**
 * Centralized KPIs and statistics calculations for job applications.
 * Guarantees consistency across Dashboard, Sidebar, and list pages.
 */
export function calculateKpiMetrics(applications: DbApplication[] = []): KpiMetrics {
  if (!applications || applications.length === 0) {
    return {
      total: 0,
      active: 0,
      interviews: 0,
      offers: 0,
      rejections: 0,
      successRate: 0,
    };
  }

  const total = applications.length;
  
  // Active is defined consistently as all applications except 'rejected' and 'saved' (draft)
  const active = applications.filter(
    (a) => a.status !== 'rejected' && a.status !== 'saved'
  ).length;

  // Interviews contains interview stage, case study, and contacted stages
  const interviews = applications.filter(
    (a) => a.status === 'interview' || a.status === 'case_study' || a.status === 'contacted'
  ).length;

  const offers = applications.filter((a) => a.status === 'offer').length;
  const rejections = applications.filter((a) => a.status === 'rejected').length;

  const positiveOutcomes = offers + interviews;
  const successRate = total > 0 ? Number(((positiveOutcomes / total) * 100).toFixed(1)) : 0;

  return {
    total,
    active,
    interviews,
    offers,
    rejections,
    successRate,
  };
}

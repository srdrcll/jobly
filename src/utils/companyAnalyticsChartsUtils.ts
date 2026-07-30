import { DbCompany, DbApplication } from '@/types';

export interface IndustryDistributionItem {
  industry: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ApplicationsPerCompanyItem {
  companyName: string;
  count: number;
}

export interface MonthlyCompanyActivityItem {
  monthKey: string;
  label: string;
  count: number;
}

export interface CompanyStatusDistributionItem {
  status: string;
  label: string;
  count: number;
  color: string;
}

const INDUSTRY_COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#a855f7', '#10b981', '#f43f5e', '#64748b'];

/**
 * Calculates Companies distribution by Industry.
 */
export function getCompaniesByIndustry(companies: DbCompany[] = []): IndustryDistributionItem[] {
  if (!companies || companies.length === 0) return [];

  const total = companies.length;
  const countMap: Record<string, number> = {};

  companies.forEach((c) => {
    const ind = c.industry || 'Diğer / Belirtilmedi';
    countMap[ind] = (countMap[ind] || 0) + 1;
  });

  return Object.entries(countMap).map(([industry, count], index) => ({
    industry,
    count,
    percentage: Number(((count / total) * 100).toFixed(1)),
    color: INDUSTRY_COLORS[index % INDUSTRY_COLORS.length],
  }));
}

/**
 * Calculates Applications count per Company.
 */
export function getApplicationsPerCompany(
  companies: DbCompany[] = [],
  applications: DbApplication[] = []
): ApplicationsPerCompanyItem[] {
  if (!companies || companies.length === 0) return [];

  const appCountMap: Record<string, number> = {};

  applications.forEach((app) => {
    if (app.company_name) {
      const name = app.company_name.trim();
      appCountMap[name] = (appCountMap[name] || 0) + 1;
    }
  });

  return companies.map((c) => ({
    companyName: c.name,
    count: appCountMap[c.name.trim()] || 0,
  })).slice(0, 8); // Top 8 companies
}

/**
 * Calculates Monthly Company creation activity for the last 6 months.
 */
export function getMonthlyCompanyActivity(companies: DbCompany[] = []): MonthlyCompanyActivityItem[] {
  const result: MonthlyCompanyActivityItem[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('tr-TR', { month: 'short' });
    result.push({ monthKey, label, count: 0 });
  }

  if (!companies || companies.length === 0) return result;

  companies.forEach((c) => {
    if (!c.created_at) return;
    const date = new Date(c.created_at);
    if (isNaN(date.getTime())) return;

    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const target = result.find((r) => r.monthKey === monthKey);
    if (target) {
      target.count += 1;
    }
  });

  return result;
}

/**
 * Calculates Company Status Distribution (Target, Researching, Applied, Contacted, Interviewed, Offer, Archived).
 */
export function getCompanyStatusDistribution(companies: DbCompany[] = []): CompanyStatusDistributionItem[] {
  if (!companies || companies.length === 0) return [];

  const statusMap: Record<string, { label: string; color: string }> = {
    Target: { label: 'Hedef Şirket', color: '#6366f1' },
    Researching: { label: 'Araştırılıyor', color: '#a855f7' },
    Applied: { label: 'Başvuruldu', color: '#06b6d4' },
    Contacted: { label: 'İletişime Geçildi', color: '#14b8a6' },
    Interviewed: { label: 'Mülakat Sürecinde', color: '#f59e0b' },
    Offer: { label: 'Teklif Alındı', color: '#10b981' },
    Archived: { label: 'Arşivlendi', color: '#64748b' },
  };

  const countMap: Record<string, number> = {};

  companies.forEach((c) => {
    const status = c.status || 'Target';
    countMap[status] = (countMap[status] || 0) + 1;
  });

  return Object.keys(statusMap)
    .filter((st) => countMap[st] > 0)
    .map((st) => ({
      status: st,
      label: statusMap[st].label,
      count: countMap[st] || 0,
      color: statusMap[st].color,
    }));
}

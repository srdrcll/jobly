import { DbApplication, ApplicationStatus } from '@/types';

export interface StatusDistributionItem {
  status: ApplicationStatus;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface MonthlyApplicationsItem {
  monthKey: string;
  label: string; // e.g. "Şub", "Mar", "Nis"
  count: number;
}

export interface WeeklyActivityItem {
  dateKey: string;
  dayLabel: string; // e.g. "Pzt", "Sal", "Çar"
  count: number;
}

const STATUS_COLOR_MAP: Record<ApplicationStatus, { label: string; color: string }> = {
  applied: { label: 'Başvuruldu', color: '#6366f1' }, // Indigo
  contacted: { label: 'İletişime Geçildi', color: '#06b6d4' }, // Cyan
  interview: { label: 'Mülakat', color: '#f59e0b' }, // Amber
  case_study: { label: 'Case Study / Vaka', color: '#a855f7' }, // Purple
  offer: { label: 'Teklif Alındı', color: '#10b981' }, // Emerald
  rejected: { label: 'Reddedildi', color: '#f43f5e' }, // Rose
  saved: { label: 'Kaydedildi', color: '#64748b' }, // Slate
};

/**
 * Calculates application counts and percentage share by status.
 */
export function getStatusDistribution(applications: DbApplication[] = []): StatusDistributionItem[] {
  if (!applications || applications.length === 0) return [];

  const total = applications.length;
  const countMap: Partial<Record<ApplicationStatus, number>> = {};

  applications.forEach((app) => {
    const status = app.status || 'applied';
    countMap[status] = (countMap[status] || 0) + 1;
  });

  const result: StatusDistributionItem[] = [];

  (Object.keys(STATUS_COLOR_MAP) as ApplicationStatus[]).forEach((status) => {
    const count = countMap[status] || 0;
    if (count > 0) {
      result.push({
        status,
        label: STATUS_COLOR_MAP[status].label,
        count,
        percentage: Number(((count / total) * 100).toFixed(1)),
        color: STATUS_COLOR_MAP[status].color,
      });
    }
  });

  return result;
}

/**
 * Groups applications submitted during the last N months (default: 6).
 */
export function getMonthlyApplications(
  applications: DbApplication[] = [],
  monthsCount = 6
): MonthlyApplicationsItem[] {
  const result: MonthlyApplicationsItem[] = [];
  const now = new Date();

  // Generate last N months
  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('tr-TR', { month: 'short' });
    result.push({ monthKey, label, count: 0 });
  }

  if (!applications || applications.length === 0) return result;

  // Group applications into months
  applications.forEach((app) => {
    const dateStr = app.applied_date || app.created_at;
    if (!dateStr) return;

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return;

    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const targetMonth = result.find((item) => item.monthKey === monthKey);
    if (targetMonth) {
      targetMonth.count += 1;
    }
  });

  return result;
}

/**
 * Calculates user activity during the last N days (default: 7).
 */
export function getWeeklyActivity(
  applications: DbApplication[] = [],
  daysCount = 7
): WeeklyActivityItem[] {
  const result: WeeklyActivityItem[] = [];
  const now = new Date();

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateKey = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('tr-TR', { weekday: 'short' });
    result.push({ dateKey, dayLabel, count: 0 });
  }

  if (!applications || applications.length === 0) return result;

  applications.forEach((app) => {
    // Check created_at and updated_at date keys
    const createdKey = app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : null;
    const updatedKey = app.updated_at ? new Date(app.updated_at).toISOString().split('T')[0] : null;
    const appliedKey = app.applied_date ? new Date(app.applied_date).toISOString().split('T')[0] : null;

    result.forEach((dayItem) => {
      if (dayItem.dateKey === createdKey || dayItem.dateKey === updatedKey || dayItem.dateKey === appliedKey) {
        dayItem.count += 1;
      }
    });
  });

  return result;
}

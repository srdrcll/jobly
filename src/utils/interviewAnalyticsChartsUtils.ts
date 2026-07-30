import { DbInterview } from '@/types';
import { getInterviewEvaluation } from './interviewCrmPrepUtils';

export interface OutcomeDistributionItem {
  status: string;
  label: string;
  count: number;
  color: string;
  percentage: number;
}

export interface TypeDistributionItem {
  type: string;
  label: string;
  count: number;
  color: string;
}

export interface MonthlyInterviewItem {
  monthKey: string;
  label: string;
  count: number;
}

export interface InterviewMetricsSummary {
  total: number;
  thisMonth: number;
  upcoming: number;
  passed: number;
  failed: number;
  offers: number;
  successRate: number; // %
  offerRate: number; // %
  averageRating: number; // out of 5
}

/**
 * Calculates high-level KPI metrics for Interviews.
 */
export function calculateInterviewMetrics(interviews: DbInterview[] = []): InterviewMetricsSummary {
  if (!interviews || interviews.length === 0) {
    return {
      total: 0,
      thisMonth: 0,
      upcoming: 0,
      passed: 0,
      failed: 0,
      offers: 0,
      successRate: 0,
      offerRate: 0,
      averageRating: 0,
    };
  }

  const now = new Date();
  const total = interviews.length;
  const passed = interviews.filter((i) => i.result === 'Passed').length;
  const failed = interviews.filter((i) => i.result === 'Failed').length;
  const offers = interviews.filter((i) => i.result === 'Offer').length;

  const upcoming = interviews.filter((i) => {
    const d = new Date(`${i.date}T${i.time || '00:00'}`);
    return !isNaN(d.getTime()) && d >= now;
  }).length;

  const thisMonth = interviews.filter((i) => {
    const d = new Date(i.date);
    return !isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const decidedCount = passed + failed + offers;
  const successRate = decidedCount > 0 ? Number((((passed + offers) / decidedCount) * 100).toFixed(1)) : 0;
  const offerRate = total > 0 ? Number(((offers / total) * 100).toFixed(1)) : 0;

  // Average Rating calculation from evaluations
  let sumRating = 0;
  let evalCount = 0;
  interviews.forEach((i) => {
    const ev = getInterviewEvaluation(i.id);
    if (ev && ev.overallRating) {
      sumRating += ev.overallRating;
      evalCount += 1;
    }
  });

  const averageRating = evalCount > 0 ? Number((sumRating / evalCount).toFixed(1)) : 4.5;

  return {
    total,
    thisMonth,
    upcoming,
    passed,
    failed,
    offers,
    successRate,
    offerRate,
    averageRating,
  };
}

/**
 * Calculates Interview Outcomes Distribution (Donut chart).
 */
export function getOutcomeDistribution(interviews: DbInterview[] = []): OutcomeDistributionItem[] {
  if (!interviews || interviews.length === 0) return [];

  const total = interviews.length;
  const map: Record<string, { label: string; color: string; count: number }> = {
    Pending: { label: 'Sonuç Bekleniyor', color: '#6366f1', count: 0 },
    Passed: { label: 'Olumlu / Geçti', color: '#10b981', count: 0 },
    Failed: { label: 'Olumsuz', color: '#f43f5e', count: 0 },
    Offer: { label: 'Teklif Alındı', color: '#f59e0b', count: 0 },
  };

  interviews.forEach((i) => {
    const res = i.result || 'Pending';
    if (map[res]) map[res].count += 1;
  });

  return Object.keys(map)
    .filter((k) => map[k].count > 0)
    .map((k) => ({
      status: k,
      label: map[k].label,
      count: map[k].count,
      color: map[k].color,
      percentage: Number(((map[k].count / total) * 100).toFixed(1)),
    }));
}

/**
 * Calculates Interview Types Distribution.
 */
export function getTypeDistribution(interviews: DbInterview[] = []): TypeDistributionItem[] {
  if (!interviews || interviews.length === 0) return [];

  const map: Record<string, { label: string; color: string; count: number }> = {
    Online: { label: 'Online Toplantı', color: '#06b6d4', count: 0 },
    'On-site': { label: 'Ofiste (Yüz Yüze)', color: '#a855f7', count: 0 },
    Phone: { label: 'Telefon Görüşmesi', color: '#14b8a6', count: 0 },
    Hybrid: { label: 'Hibrit', color: '#6366f1', count: 0 },
  };

  interviews.forEach((i) => {
    const t = i.type || 'Online';
    if (map[t]) map[t].count += 1;
  });

  return Object.keys(map)
    .filter((k) => map[k].count > 0)
    .map((k) => ({
      type: k,
      label: map[k].label,
      count: map[k].count,
      color: map[k].color,
    }));
}

/**
 * Calculates Monthly Interviews for the last 6 months.
 */
export function getMonthlyInterviews(interviews: DbInterview[] = []): MonthlyInterviewItem[] {
  const result: MonthlyInterviewItem[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('tr-TR', { month: 'short' });
    result.push({ monthKey, label, count: 0 });
  }

  if (!interviews || interviews.length === 0) return result;

  interviews.forEach((i) => {
    if (!i.date) return;
    const d = new Date(i.date);
    if (isNaN(d.getTime())) return;

    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const target = result.find((r) => r.monthKey === monthKey);
    if (target) {
      target.count += 1;
    }
  });

  return result;
}

/**
 * Gets next upcoming interview and calculates countdown text.
 */
export function getNextInterviewCountdown(interviews: DbInterview[] = []): {
  interview: DbInterview | null;
  countdownText: string;
  isUrgent: boolean;
} {
  if (!interviews || interviews.length === 0) {
    return { interview: null, countdownText: 'Planlanmış mülakat bulunmuyor', isUrgent: false };
  }

  const now = new Date();
  const upcomingList = interviews
    .map((i) => {
      const timeStr = i.time || '14:00';
      const d = new Date(`${i.date}T${timeStr}`);
      return { interview: i, timestamp: d.getTime() };
    })
    .filter((item) => !isNaN(item.timestamp) && item.timestamp >= now.getTime())
    .sort((a, b) => a.timestamp - b.timestamp);

  if (upcomingList.length === 0) {
    return { interview: null, countdownText: 'Yaklaşan mülakat yok', isUrgent: false };
  }

  const next = upcomingList[0];
  const diffMs = next.timestamp - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const remHours = diffHours % 24;

  let countdownText = '';
  if (diffDays > 0) {
    countdownText = `${diffDays} gün ${remHours} saat kaldı`;
  } else if (diffHours > 0) {
    countdownText = `${diffHours} saat kaldı`;
  } else {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    countdownText = `${diffMins} dakika kaldı!`;
  }

  return {
    interview: next.interview,
    countdownText,
    isUrgent: diffMs <= 24 * 60 * 60 * 1000,
  };
}

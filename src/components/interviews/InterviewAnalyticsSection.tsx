import React, { useMemo } from 'react';
import { PieChart, BarChart3, TrendingUp, Award, Star } from 'lucide-react';
import { DbInterview } from '@/types';
import { 
  calculateInterviewMetrics, 
  getOutcomeDistribution, 
  getTypeDistribution, 
  getMonthlyInterviews 
} from '@/utils/interviewAnalyticsChartsUtils';
import { StatusDistributionChart } from '@/components/dashboard/StatusDistributionChart';
import { MonthlyApplicationsChart } from '@/components/dashboard/MonthlyApplicationsChart';

interface InterviewAnalyticsSectionProps {
  interviews: DbInterview[];
}

export const InterviewAnalyticsSection: React.FC<InterviewAnalyticsSectionProps> = ({ interviews }) => {
  const metrics = useMemo(() => calculateInterviewMetrics(interviews), [interviews]);
  const outcomeData = useMemo(() => getOutcomeDistribution(interviews), [interviews]);
  const typeData = useMemo(() => getTypeDistribution(interviews), [interviews]);
  const monthlyData = useMemo(() => getMonthlyInterviews(interviews), [interviews]);

  // Adapter for reusable chart components
  const outcomeChartAdapterData = outcomeData.map((d) => ({
    status: d.status as any,
    label: d.label,
    count: d.count,
    percentage: d.percentage,
    color: d.color,
  }));

  const barChartAdapterData = monthlyData.map((d) => ({
    monthKey: d.monthKey,
    label: d.label,
    count: d.count,
  }));

  return (
    <section aria-label="Mülakat Analitik Grafikleri" className="space-y-6 animate-fadeIn">
      {/* 1. Extended Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Mülakat Başarı Oranı</span>
            <p className="text-lg font-extrabold text-foreground">%{metrics.successRate}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Teklif Oranı</span>
            <p className="text-lg font-extrabold text-foreground">%{metrics.offerRate}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Star className="w-5 h-5 fill-purple-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Ortalama Değerlendirme</span>
            <p className="text-lg font-extrabold text-foreground">{metrics.averageRating} / 5</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Bu Ayki Mülakatlar</span>
            <p className="text-lg font-extrabold text-foreground">{metrics.thisMonth}</p>
          </div>
        </div>
      </div>

      {/* 2. Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outcome Donut Chart */}
        <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" aria-hidden="true">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Görüşme Sonuç Dağılımı</h3>
              <p className="text-[11px] text-slate-400">Olumlu, olumsuz ve teklif oranları</p>
            </div>
          </div>
          <StatusDistributionChart data={outcomeChartAdapterData} totalApplications={interviews.length} />
        </article>

        {/* Monthly Interviews Bar Chart */}
        <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400" aria-hidden="true">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Aylık Mülakat Yoğunluğu</h3>
              <p className="text-[11px] text-slate-400">Son 6 aydaki mülakat sayıları</p>
            </div>
          </div>
          <MonthlyApplicationsChart data={barChartAdapterData} />
        </article>
      </div>
    </section>
  );
};

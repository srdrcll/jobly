import React from 'react';
import { BarChart3, PieChart, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { getStatusDistribution, getMonthlyApplications, getWeeklyActivity } from '@/utils/analyticsUtils';
import { StatusDistributionChart } from './StatusDistributionChart';
import { MonthlyApplicationsChart } from './MonthlyApplicationsChart';
import { WeeklyActivityChart } from './WeeklyActivityChart';
import { Button } from '@/components/ui/Button';

export const AnalyticsSection: React.FC = () => {
  const { data: applications = [], isLoading, isError, error, refetch } = useApplicationsListQuery();

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 h-72 animate-pulse space-y-4">
          <div className="h-5 w-40 bg-slate-800 rounded-lg" />
          <div className="h-44 bg-slate-800/50 rounded-xl" />
        </div>
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 h-72 animate-pulse space-y-4">
          <div className="h-5 w-40 bg-slate-800 rounded-lg" />
          <div className="h-44 bg-slate-800/50 rounded-xl" />
        </div>
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 h-72 animate-pulse space-y-4">
          <div className="h-5 w-40 bg-slate-800 rounded-lg" />
          <div className="h-44 bg-slate-800/50 rounded-xl" />
        </div>
      </div>
    );
  }

  // 2. Query Error State
  if (isError) {
    return (
      <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-rose-200">Analiz Verileri Yüklenemedi</p>
            <p className="text-rose-300/80">{error?.message || 'Grafik verileri alınırken bir sorun oluştu.'}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20 shrink-0"
        >
          Tekrar Dene
        </Button>
      </div>
    );
  }

  // 3. Compute Analytics
  const statusData = getStatusDistribution(applications);
  const monthlyData = getMonthlyApplications(applications, 6);
  const weeklyData = getWeeklyActivity(applications, 7);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Analiz ve Performans Grafikleri
        </h2>
        <span className="text-xs text-slate-400 font-medium">Sprint 5.3 • Canlı Analiz</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Status Distribution Pie/Donut Chart */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Durum Dağılımı</h3>
              <p className="text-[11px] text-slate-400">Başvuruların aşamalara göre yüzdesi</p>
            </div>
          </div>
          <StatusDistributionChart data={statusData} totalApplications={applications.length} />
        </div>

        {/* Chart 2: Monthly Applications Bar Chart */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Aylık Başvurular (Son 6 Ay)</h3>
              <p className="text-[11px] text-slate-400">Aylara göre eklenen başvuru sayıları</p>
            </div>
          </div>
          <MonthlyApplicationsChart data={monthlyData} />
        </div>

        {/* Chart 3: Weekly Activity Line Chart */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Haftalık Aktivite (Son 7 Gün)</h3>
              <p className="text-[11px] text-slate-400">Günlük güncelleme ve ekleme yoğunluğu</p>
            </div>
          </div>
          <WeeklyActivityChart data={weeklyData} />
        </div>
      </div>
    </div>
  );
};

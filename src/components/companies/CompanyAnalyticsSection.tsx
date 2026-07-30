import React, { useMemo } from 'react';
import { PieChart, BarChart3, Activity, Target } from 'lucide-react';
import { DbCompany, DbApplication } from '@/types';
import { 
  getCompaniesByIndustry, 
  getApplicationsPerCompany, 
  getMonthlyCompanyActivity, 
  getCompanyStatusDistribution 
} from '@/utils/companyAnalyticsChartsUtils';
import { StatusDistributionChart } from '@/components/dashboard/StatusDistributionChart';
import { MonthlyApplicationsChart } from '@/components/dashboard/MonthlyApplicationsChart';
import { WeeklyActivityChart } from '@/components/dashboard/WeeklyActivityChart';

interface CompanyAnalyticsSectionProps {
  companies: DbCompany[];
  applications: DbApplication[];
}

export const CompanyAnalyticsSection: React.FC<CompanyAnalyticsSectionProps> = ({ companies, applications }) => {
  // Memoize analytics calculations
  const industryData = useMemo(() => getCompaniesByIndustry(companies), [companies]);
  const appsPerCompanyData = useMemo(() => getApplicationsPerCompany(companies, applications), [companies, applications]);
  const monthlyActivityData = useMemo(() => getMonthlyCompanyActivity(companies), [companies]);
  const statusDistributionData = useMemo(() => getCompanyStatusDistribution(companies), [companies]);

  // Convert for reusable chart components
  const statusChartAdapterData = statusDistributionData.map((d) => ({
    status: d.status as any,
    label: d.label,
    count: d.count,
    percentage: Number(((d.count / (companies.length || 1)) * 100).toFixed(1)),
    color: d.color,
  }));

  const barChartAdapterData = appsPerCompanyData.map((d) => ({
    monthKey: d.companyName,
    label: d.companyName.length > 8 ? `${d.companyName.substring(0, 7)}...` : d.companyName,
    count: d.count,
  }));

  const lineChartAdapterData = monthlyActivityData.map((d) => ({
    dateKey: d.monthKey,
    dayLabel: d.label,
    count: d.count,
  }));

  return (
    <section aria-label="Şirket Analitik ve Dağılım Grafikleri" className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Şirket CRM Analitik Grafikleri
        </h2>
        <span className="text-xs text-slate-400 font-medium">Sprint 6.4 • Canlı Analiz</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Company Status Distribution Donut Chart */}
        <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" aria-hidden="true">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Takip Durum Dağılımı</h3>
              <p className="text-[11px] text-slate-400">Hedef, mülakat ve teklif aşamaları</p>
            </div>
          </div>
          <StatusDistributionChart data={statusChartAdapterData} totalApplications={companies.length} />
        </article>

        {/* Chart 2: Applications per Company Bar Chart */}
        <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400" aria-hidden="true">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Şirket Başına Başvuru Yoğunluğu</h3>
              <p className="text-[11px] text-slate-400">En çok başvuru yapılan şirketler</p>
            </div>
          </div>
          <MonthlyApplicationsChart data={barChartAdapterData} />
        </article>

        {/* Chart 3: Monthly Company Activity Line Chart */}
        <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400" aria-hidden="true">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Aylık Şirket Kayıt Trendi</h3>
              <p className="text-[11px] text-slate-400">Son 6 ayda eklenen şirketler</p>
            </div>
          </div>
          <WeeklyActivityChart data={lineChartAdapterData} />
        </article>
      </div>
    </section>
  );
};

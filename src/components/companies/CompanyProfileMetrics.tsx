import React from 'react';
import { Briefcase, Clock, Users, PartyPopper, XCircle, TrendingUp } from 'lucide-react';
import { CompanyMetrics } from '@/utils/companyAnalyticsUtils';

interface CompanyProfileMetricsProps {
  metrics: CompanyMetrics;
}

export const CompanyProfileMetrics: React.FC<CompanyProfileMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* 1. Total */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Toplam Başvuru</span>
          <Briefcase className="w-4 h-4 text-indigo-400" />
        </div>
        <p className="text-xl font-black text-foreground">{metrics.total}</p>
        <span className="text-[10px] text-slate-500">Tüm zamanların kaydı</span>
      </div>

      {/* 2. Active */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Devam Eden</span>
          <Clock className="w-4 h-4 text-purple-400" />
        </div>
        <p className="text-xl font-black text-foreground">{metrics.active}</p>
        <span className="text-[10px] text-slate-500">Aktif süreçler</span>
      </div>

      {/* 3. Interviews */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Mülakatlar</span>
          <Users className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-xl font-black text-foreground">{metrics.interviews}</p>
        <span className="text-[10px] text-slate-500">Teknik & İK</span>
      </div>

      {/* 4. Offers */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Teklifler</span>
          <PartyPopper className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-xl font-black text-foreground">{metrics.offers}</p>
        <span className="text-[10px] text-slate-500">Kazanılan teklifler</span>
      </div>

      {/* 5. Rejections */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Reddedilenler</span>
          <XCircle className="w-4 h-4 text-rose-400" />
        </div>
        <p className="text-xl font-black text-foreground">{metrics.rejections}</p>
        <span className="text-[10px] text-slate-500">Olumsuz sonuçlar</span>
      </div>

      {/* 6. Success Rate */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Başarı Oranı</span>
          <TrendingUp className="w-4 h-4 text-teal-400" />
        </div>
        <p className="text-xl font-black text-foreground">%{metrics.successRate}</p>
        <span className="text-[10px] text-slate-500">Dönüşüm oranı</span>
      </div>
    </div>
  );
};

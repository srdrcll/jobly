import React from 'react';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

export const AnalyticsPlaceholder: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-5 h-full flex flex-col justify-between">
      {/* Container Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Analiz ve Başvuru Hunisi</h3>
            <p className="text-xs text-slate-400">Dönüşüm oranları ve aşama dağılım istatistikleri</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <Sparkles className="w-3 h-3" /> Sprint 5.3
        </span>
      </div>

      {/* Wireframe Chart Placeholder Content */}
      <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col items-center justify-center text-center space-y-4 my-auto min-h-[220px]">
        {/* Mock Chart Visual Bars */}
        <div className="flex items-end justify-center gap-3 h-28 w-full max-w-xs px-4">
          <div className="w-1/5 bg-indigo-500/30 dark:bg-indigo-500/20 rounded-t-md h-[40%] animate-pulse" />
          <div className="w-1/5 bg-indigo-500/50 dark:bg-indigo-500/40 rounded-t-md h-[70%] animate-pulse" />
          <div className="w-1/5 bg-indigo-500/80 dark:bg-indigo-500/60 rounded-t-md h-[100%] animate-pulse" />
          <div className="w-1/5 bg-violet-500/50 dark:bg-violet-500/40 rounded-t-md h-[55%] animate-pulse" />
          <div className="w-1/5 bg-purple-500/30 dark:bg-purple-500/20 rounded-t-md h-[30%] animate-pulse" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Performans Grafikleri ve Dönüşüm Analizi</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Başvuru huniniz, haftalık dönüşüm oranlarınız ve başvuru durum dağılımlarınız bu alanda görüntülenecektir.
          </p>
        </div>
      </div>
    </div>
  );
};

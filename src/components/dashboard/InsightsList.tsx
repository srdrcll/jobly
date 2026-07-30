import React, { useMemo } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { generateCareerInsights } from '@/utils/insightsUtils';
import { InsightCard } from './InsightCard';
import { Button } from '@/components/ui/Button';

export const InsightsList: React.FC = () => {
  const { data: applications = [], isLoading, isError, error, refetch } = useApplicationsListQuery();

  // Memoize dynamic insights generation
  const insights = useMemo(() => generateCareerInsights(applications), [applications]);

  if (isLoading) {
    return (
      <section aria-label="İpuçları yükleniyor..." className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 h-64 animate-pulse space-y-3">
        <div className="h-5 w-40 bg-slate-800 rounded-lg" />
        <div className="h-16 bg-slate-800/50 rounded-xl" />
        <div className="h-16 bg-slate-800/50 rounded-xl" />
      </section>
    );
  }

  if (isError) {
    return (
      <div 
        role="alert"
        className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-bold text-rose-200">Kariyer İpuçları Yüklenemedi</p>
            <p className="text-rose-300/80">{error?.message || 'İpuçları oluşturulurken sorun oluştu.'}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20 shrink-0 focus-visible:ring-2 focus-visible:ring-rose-500"
          aria-label="İpuçlarını tekrar yükle"
        >
          Tekrar Dene
        </Button>
      </div>
    );
  }

  return (
    <section aria-label="Pusula Tavsiyeleri ve İpuçları" className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400" aria-hidden="true">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Pusula Tavsiyeleri & İpuçları</h3>
            <p className="text-xs text-slate-400">Başvuru verilerinize göre otomatik oluşturulan öneriler</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
          Otomatik Analiz
        </span>
      </div>

      {/* Dynamic Insights Stack (Max 3) */}
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
};

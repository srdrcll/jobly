import React, { useMemo } from 'react';
import { History, RefreshCw, AlertCircle } from 'lucide-react';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { extractRecentActivities } from '@/utils/activityUtils';
import { extractUpcomingInterviews } from '@/utils/interviewUtils';
import { ActivityList } from './ActivityList';
import { UpcomingInterviews } from './UpcomingInterviews';
import { Button } from '@/components/ui/Button';

export const RecentActivitySection: React.FC = () => {
  const { data: applications = [], isLoading, isError, error, refetch } = useApplicationsListQuery();

  // Memoize activity and interview data extractions
  const activities = useMemo(() => extractRecentActivities(applications, 10), [applications]);
  const interviews = useMemo(() => extractUpcomingInterviews(applications), [applications]);

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <section aria-label="Aktiviteler yükleniyor..." className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 h-80 animate-pulse space-y-4">
          <div className="h-5 w-40 bg-slate-800 rounded-lg" />
          <div className="space-y-3 pt-2">
            <div className="h-12 bg-slate-800/50 rounded-xl" />
            <div className="h-12 bg-slate-800/50 rounded-xl" />
            <div className="h-12 bg-slate-800/50 rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 h-80 animate-pulse space-y-4">
          <div className="h-5 w-40 bg-slate-800 rounded-lg" />
          <div className="space-y-3 pt-2">
            <div className="h-20 bg-slate-800/50 rounded-xl" />
            <div className="h-20 bg-slate-800/50 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  // 2. Query Error State
  if (isError) {
    return (
      <div 
        role="alert"
        className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-bold text-rose-200">Aktiviteler ve Mülakatlar Yüklenemedi</p>
            <p className="text-rose-300/80">{error?.message || 'Aktivite akışı alınırken bir sorun oluştu.'}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20 shrink-0 focus-visible:ring-2 focus-visible:ring-rose-500"
          aria-label="Aktiviteleri tekrar yükle"
        >
          Tekrar Dene
        </Button>
      </div>
    );
  }

  return (
    <section aria-label="Aktivite Akışı ve Mülakatlar" className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Aktivite Akışı ve Yaklaşan Mülakatlar
        </h2>
        <span className="text-xs text-slate-400 font-medium">Canlı Akış</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: Recent Activity Feed (3/5 width) */}
        <article className="lg:col-span-3 bg-white/80 dark:bg-[#0D1424]/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/70 rounded-3xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 specular-border hover:border-slate-300 dark:hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" aria-hidden="true">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Son Aktiviteler</h3>
                <p className="text-xs text-slate-400">Son 10 başvuru güncellemesi ve hareket akışı</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              {activities.length} Etkinlik
            </span>
          </div>

          <ActivityList activities={activities} />
        </article>

        {/* Right Column: Upcoming Interviews (2/5 width) */}
        <article className="lg:col-span-2">
          <UpcomingInterviews interviews={interviews} />
        </article>
      </div>
    </section>
  );
};

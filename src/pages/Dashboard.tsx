import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { KpiCardsGrid } from '@/components/dashboard/KpiCardsGrid';
import { AnalyticsSection } from '@/components/dashboard/AnalyticsSection';
import { RecentActivitySection } from '@/components/dashboard/RecentActivitySection';

export const DashboardPage: React.FC = () => {
  const context = useOutletContext<{ onOpenNewModal?: () => void }>();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Welcome Section with Dynamic Greeting & Motivational Text */}
      <WelcomeSection onOpenNewModal={context?.onOpenNewModal} />

      {/* 2. Quick Actions Section (4 UI Action Buttons) */}
      <QuickActionsSection onOpenNewModal={context?.onOpenNewModal} />

      {/* 3. Reusable KPI Metric Cards Grid (6 Live Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Canlı İstatistik İcmali
          </h2>
          <span className="text-xs text-slate-400 font-medium">Supabase Canlı Veri • Sprint 5.2</span>
        </div>
        <KpiCardsGrid onOpenNewModal={context?.onOpenNewModal} />
      </div>

      {/* 4. Analytics Visualizations Section (3 Real-time Charts) */}
      <AnalyticsSection />

      {/* 5. Recent Activity Feed & Upcoming Interviews Section (Sprint 5.4 Live Widgets) */}
      <RecentActivitySection />
    </div>
  );
};

export default DashboardPage;

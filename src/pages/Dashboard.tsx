import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { KpiCardsGrid } from '@/components/dashboard/KpiCardsGrid';
import { InsightsList } from '@/components/dashboard/InsightsList';
import { AnalyticsSection } from '@/components/dashboard/AnalyticsSection';
import { RecentActivitySection } from '@/components/dashboard/RecentActivitySection';

export const DashboardPage: React.FC = () => {
  const context = useOutletContext<{ onOpenNewModal?: () => void }>();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Welcome Section with Dynamic Greeting & Motivational Text */}
      <WelcomeSection onOpenNewModal={context?.onOpenNewModal} />

      {/* 3. Reusable KPI Metric Cards Grid (6 Live Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Canlı İstatistik İcmali
          </h2>
          <span className="text-xs text-slate-400 font-medium">Canlı Veriler</span>
        </div>
        <KpiCardsGrid onOpenNewModal={context?.onOpenNewModal} />
      </div>

      {/* 4. Dynamic Career Insights & Recommendations Widget (Sprint 5.5) */}
      <InsightsList />

      {/* 5. Analytics Visualizations Section (3 Real-time Charts) */}
      <div id="analytics-section">
        <AnalyticsSection />
      </div>

      {/* 6. Recent Activity Feed & Upcoming Interviews Section (Sprint 5.4 Live Widgets) */}
      <RecentActivitySection />
    </div>
  );
};

export default DashboardPage;

import React from 'react';
import { History } from 'lucide-react';
import { ActivityEvent } from '@/utils/activityUtils';
import { ActivityItem } from './ActivityItem';

interface ActivityListProps {
  activities: ActivityEvent[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl space-y-2">
        <History className="w-8 h-8 text-slate-500" />
        <p className="text-xs font-semibold text-slate-400">Henüz Aktivite Yok</p>
        <p className="text-[11px] text-slate-500 max-w-xs">
          Yeni iş başvurusu ekledikçe veya durumları güncelledikçe son aktiviteleriniz burada listelenecektir.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-1 space-y-1 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800/80">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

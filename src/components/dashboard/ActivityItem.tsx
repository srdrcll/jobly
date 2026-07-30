import React from 'react';
import { PlusCircle, Edit3, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import { ActivityEvent } from '@/utils/activityUtils';
import { useNavigate } from 'react-router-dom';

interface ActivityItemProps {
  activity: ActivityEvent;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const navigate = useNavigate();

  const getIconConfig = () => {
    switch (activity.type) {
      case 'created':
        return {
          icon: PlusCircle,
          bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          dot: 'bg-indigo-500',
        };
      case 'interview_scheduled':
        return {
          icon: Calendar,
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          dot: 'bg-purple-500',
        };
      case 'status_changed':
        return {
          icon: RefreshCw,
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          dot: 'bg-amber-500',
        };
      case 'updated':
      default:
        return {
          icon: Edit3,
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
          dot: 'bg-slate-500',
        };
    }
  };

  const config = getIconConfig();
  const Icon = config.icon;

  return (
    <div
      onClick={() => navigate(`/applications/${activity.applicationId}`)}
      className="group relative pl-7 py-3 pr-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
    >
      {/* Timeline Dot Indicator */}
      <div
        className={`absolute left-1.5 top-5 w-2.5 h-2.5 rounded-full ${config.dot} ring-4 ring-slate-100 dark:ring-slate-900 group-hover:scale-125 transition-transform`}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-2 rounded-lg border ${config.bg} shrink-0`} aria-hidden="true">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors truncate">
              {activity.title}
            </h4>
          </div>
          <p className="text-xs text-slate-400 truncate">
            {activity.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 text-xs text-slate-400 font-medium">
        <span>{activity.formattedTime}</span>
        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-indigo-400" />
      </div>
    </div>
  );
};

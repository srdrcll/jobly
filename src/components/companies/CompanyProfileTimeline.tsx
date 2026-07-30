import React from 'react';
import { History, Send, Calendar, Award } from 'lucide-react';
import { CompanyTimelineEvent } from '@/utils/companyAnalyticsUtils';
import { useNavigate } from 'react-router-dom';

interface CompanyProfileTimelineProps {
  timelineEvents: CompanyTimelineEvent[];
}

export const CompanyProfileTimeline: React.FC<CompanyProfileTimelineProps> = ({ timelineEvents }) => {
  const navigate = useNavigate();

  if (!timelineEvents || timelineEvents.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark text-center space-y-2">
        <History className="w-8 h-8 text-slate-500 mx-auto" />
        <p className="text-xs font-bold text-slate-300">Zaman Tüneli Kaydı Bulunmuyor</p>
        <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
          Bu şirkete yapılmış başvuru veya mülakat etkinliği henüz bulunmamaktadır.
        </p>
      </div>
    );
  }

  const getEventIcon = (type: CompanyTimelineEvent['type']) => {
    switch (type) {
      case 'offer':
        return { icon: Award, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'interview':
        return { icon: Calendar, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
      case 'created':
      default:
        return { icon: Send, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">Başvuru & Süreç Zaman Tüneli</h3>
          <p className="text-xs text-slate-400">Bu şirketle gerçekleştirdiğiniz tüm etkileşimler</p>
        </div>
      </div>

      <div className="relative pl-4 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timelineEvents.map((event) => {
          const config = getEventIcon(event.type);
          const Icon = config.icon;

          return (
            <div
              key={event.id}
              onClick={() => navigate(`/applications/${event.applicationId}`)}
              className="group p-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${config.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                    {event.title} — {event.position}
                  </h4>
                  <p className="text-xs text-slate-400">{event.description}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">{event.formattedDate}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

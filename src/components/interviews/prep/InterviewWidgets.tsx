import React from 'react';
import { Calendar, Clock, Video, Award, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { DbInterview } from '@/types';
import { InterviewStatusBadge } from '../InterviewStatusBadge';
import { getInterviewsThisMonth } from '@/utils/interviewCrmPrepUtils';

interface InterviewWidgetsProps {
  interviews: DbInterview[];
  onSelectInterview?: (interview: DbInterview) => void;
}

export const InterviewWidgets: React.FC<InterviewWidgetsProps> = ({
  interviews,
  onSelectInterview,
}) => {
  const thisMonthInterviews = getInterviewsThisMonth(interviews);

  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const upcomingInterviews = interviews
    .filter((i) => {
      const d = new Date(`${i.date}T${i.time || '00:00'}`);
      return !isNaN(d.getTime()) && d >= now;
    })
    .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime())
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Widget 1: Upcoming Interviews */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Yaklaşan Mülakat Randevuları</h3>
              <p className="text-[11px] text-slate-400">En yakın mülakat takvimi ve bağlantıları</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
            {upcomingInterviews.length} Yaklaşan
          </span>
        </div>

        {upcomingInterviews.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
            Yakın zamanda planlanmış mülakat randevusu bulunmuyor.
          </div>
        ) : (
          <div className="space-y-2">
            {upcomingInterviews.map((item) => {
              const d = new Date(`${item.date}T${item.time || '00:00'}`);
              const isUrgent = d <= next24h;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectInterview && onSelectInterview(item)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-3 group ${
                    isUrgent
                      ? 'bg-amber-500/10 dark:bg-amber-950/20 border-amber-500/40 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center text-xs shrink-0">
                      {item.company_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground group-hover:text-purple-400 transition-colors truncate">
                        {item.position}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.company_name} • {new Date(item.date).toLocaleDateString('tr-TR')} {item.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isUrgent && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-extrabold animate-pulse">
                        24s Kaldı
                      </span>
                    )}
                    <InterviewStatusBadge result={item.result} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Widget 2: Interviews This Month */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Bu Ayki Mülakat Temposu</h3>
              <p className="text-[11px] text-slate-400">Bu ay gerçekleştirilen ve planlanan mülakatlar</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            {thisMonthInterviews.length} Bu Ay
          </span>
        </div>

        {thisMonthInterviews.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
            Bu ay için henüz mülakat randevusu eklenmemiş.
          </div>
        ) : (
          <div className="space-y-2">
            {thisMonthInterviews.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectInterview && onSelectInterview(item)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    {item.company_name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-purple-400 transition-colors truncate">
                      {item.company_name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{item.stage || 'Mülakat'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <InterviewStatusBadge result={item.result} />
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

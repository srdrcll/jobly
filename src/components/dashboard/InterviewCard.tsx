import React from 'react';
import { Calendar, Clock, Video, Building2, ExternalLink, Sparkles } from 'lucide-react';
import { InterviewItemData } from '@/utils/interviewUtils';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface InterviewCardProps {
  interview: InterviewItemData;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  const navigate = useNavigate();
  const isUrgent = interview.isWithin24Hours;

  return (
    <div
      onClick={() => navigate(`/applications/${interview.applicationId}`)}
      className={cn(
        'p-4 rounded-xl border transition-all duration-300 cursor-pointer space-y-3 relative overflow-hidden group hover:-translate-y-0.5 shadow-sm',
        isUrgent
          ? 'bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-slate-900 border-amber-500/40 shadow-amber-500/10 shadow-lg'
          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
      )}
    >
      {/* Top Header: Company Name & Urgency Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center text-xs shrink-0">
            {interview.companyName.charAt(0)}
          </div>
          <span className="font-bold text-xs text-foreground truncate group-hover:text-indigo-400 transition-colors">
            {interview.companyName}
          </span>
        </div>

        {isUrgent ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold animate-pulse shrink-0">
            <Sparkles className="w-3 h-3" /> 24 Saat İçinde
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold text-[10px] shrink-0">
            Planlandı
          </span>
        )}
      </div>

      {/* Position Title */}
      <h4 className="text-xs font-semibold text-slate-200 truncate">
        {interview.position}
      </h4>

      {/* Date, Time & Interview Type Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span>{interview.dateFormatted}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          {interview.workType === 'On-site' ? (
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <Video className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span className="truncate max-w-[110px]">{interview.interviewType}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 ml-0.5" />
        </div>
      </div>
    </div>
  );
};

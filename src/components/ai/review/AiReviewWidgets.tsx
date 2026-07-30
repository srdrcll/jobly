import React from 'react';
import { FileText, Mail, Award, AlertCircle, TrendingUp } from 'lucide-react';
import { useResumeReviewsQuery, useCoverLetterReviewsQuery } from '@/hooks/queries/useAiReviewQuery';

export const AiReviewWidgets: React.FC = () => {
  const { data: resumeReviews = [] } = useResumeReviewsQuery();
  const { data: coverReviews = [] } = useCoverLetterReviewsQuery();

  const latestResume = resumeReviews[0];
  const latestCover = coverReviews[0];

  const pendingIssuesCount = (latestResume?.suggestions.criticalIssues.length || 0) + 
                            (latestCover?.suggestions.criticalIssues.length || 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
      {/* Widget 1: Latest Resume Score */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Son Özgeçmiş Skoru</span>
            <p className="text-xl font-black text-foreground">
              {latestResume ? `${latestResume.overallScore} / 100` : 'Henüz Yok'}
            </p>
          </div>
        </div>
      </div>

      {/* Widget 2: Latest Cover Letter Score */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Son Ön Mektup Skoru</span>
            <p className="text-xl font-black text-foreground">
              {latestCover ? `${latestCover.overallScore} / 100` : 'Henüz Yok'}
            </p>
          </div>
        </div>
      </div>

      {/* Widget 3: Pending Action Items */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Bekleyen Düzeltmeler</span>
            <p className="text-xl font-black text-foreground">{pendingIssuesCount} Kritik Madde</p>
          </div>
        </div>
      </div>
    </div>
  );
};

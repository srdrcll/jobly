import React from 'react';
import { History, FileText, Mail, Trash2, ArrowUpRight, TrendingUp } from 'lucide-react';
import { 
  useResumeReviewsQuery, 
  useCoverLetterReviewsQuery,
  useDeleteResumeReviewMutation,
  useDeleteCoverLetterReviewMutation
} from '@/hooks/queries/useAiReviewQuery';
import { Button } from '@/components/ui/Button';

export const ReviewVersionHistory: React.FC = () => {
  const { data: resumeReviews = [] } = useResumeReviewsQuery();
  const { data: coverReviews = [] } = useCoverLetterReviewsQuery();

  const deleteResumeMutation = useDeleteResumeReviewMutation();
  const deleteCoverMutation = useDeleteCoverLetterReviewMutation();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Resume Review History */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Özgeçmiş Versiyon Geçmişi</h3>
              <p className="text-xs text-slate-400">Önceki tarama skorları ve karşılaştırma geçmişi</p>
            </div>
          </div>
          <span className="text-xs font-bold text-purple-400">{resumeReviews.length} Versiyon Kayıtlı</span>
        </div>

        {resumeReviews.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
            Henüz taranmış özgeçmiş versiyonu bulunmuyor.
          </div>
        ) : (
          <div className="space-y-2">
            {resumeReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 font-extrabold text-xs">
                    v{rev.version}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate">{rev.fileName}</h4>
                    <p className="text-[11px] text-slate-400">{new Date(rev.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-400">{rev.overallScore} / 100</span>
                    <span className="text-[10px] text-slate-400 block font-medium">ATS Skor</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteResumeMutation.mutate(rev.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Cover Letter History */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Ön Mektup Versiyon Geçmişi</h3>
              <p className="text-xs text-slate-400">Geçmiş mektup incelemeleri</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-400">{coverReviews.length} Versiyon Kayıtlı</span>
        </div>

        {coverReviews.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
            Henüz incelenmiş ön mektup bulunmuyor.
          </div>
        ) : (
          <div className="space-y-2">
            {coverReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-extrabold text-xs">
                    v{rev.version}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate">{rev.title}</h4>
                    <p className="text-[11px] text-slate-400">{new Date(rev.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-black text-indigo-400">{rev.overallScore} / 100</span>
                    <span className="text-[10px] text-slate-400 block font-medium">Kalite Skoru</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteCoverMutation.mutate(rev.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

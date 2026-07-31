import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useReviewResumeMutation, useResumeReviewsQuery } from '@/hooks/queries/useAiReviewQuery';
import { ResumeReviewRecord } from '@/types/aiReview';
import { Button } from '@/components/ui/Button';

export const ResumeReviewSection: React.FC = () => {
  const { data: reviews = [] } = useResumeReviewsQuery();
  const reviewMutation = useReviewResumeMutation();

  const [fileName, setFileName] = useState('Senior_Frontend_Developer_CV.pdf');
  const [contentText, setContentText] = useState(
    'Serdar Çil — Senior Frontend Developer\nE-posta: serdar@example.com | LinkedIn: linkedin.com/in/srdrcll | GitHub: github.com/srdrcll\n\nÖzet:\n7+ yıl deneyimli Frontend Mühendisi. React 19, TypeScript, Tailwind CSS ve bulut mimarileri ile yüksek ölçekli SaaS uygulamaları geliştirme konusunda uzmanım.\n\nİş Deneyimi:\nKıdemli Yazılım Geliştirici (2023 - Halen)\n- SaaS ATS platformu frontend mimarisini tasarladı.\n- TanStack Query ile sayfa yükleme sürelerini %35 düşürdü.'
  );

  const [activeReview, setActiveReview] = useState<ResumeReviewRecord | null>(() => reviews[0] || null);

  const handleRunReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentText.trim()) return;

    reviewMutation.mutate(
      { fileName: fileName || 'CV.pdf', contentText },
      {
        onSuccess: (record) => {
          setActiveReview(record);
        },
      }
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Resume Input & Upload Panel */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Özgeçmiş (CV) Yapay Zekâ Taraması</h3>
              <p className="text-xs text-slate-400">PDF/DOCX dosya yükleyin veya metninizi yapıştırın</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleRunReview} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Dosya Adı</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-foreground focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Hızlı PDF Yükle (Simüle)</label>
              <div className="h-10 px-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-400 cursor-pointer hover:border-purple-500 transition-colors">
                <span className="flex items-center gap-1.5 font-medium">
                  <Upload className="w-4 h-4 text-purple-400" /> PDF / DOCX Yükle
                </span>
                <span className="text-[10px] text-purple-400 font-bold">Gözat</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Özgeçmiş Metni *</label>
            <textarea
              rows={5}
              required
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="Özgeçmişinizin tüm metnini buraya yapıştırın..."
              className="w-full p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none font-sans"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={reviewMutation.isPending}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md"
            >
              Yapay Zekâ ile Özgeçmişi Tara
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Review Feedback Panel */}
      {activeReview && (
        <div className="space-y-6 animate-fadeIn">
          {/* Overall Score Gauge Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft dark:shadow-soft-dark flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-black text-foreground">Özgeçmiş ATS Uyum Raporu</h3>
              </div>
              <p className="text-xs text-slate-400">
                Versiyon #{activeReview.version} — {activeReview.fileName} ({new Date(activeReview.createdAt).toLocaleDateString('tr-TR')})
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className={`p-4 rounded-2xl border text-center ${getScoreColor(activeReview.overallScore)}`}>
                <span className="text-3xl font-black">{activeReview.overallScore}</span>
                <span className="text-xs font-bold block">/ 100 ATS Skor</span>
              </div>
            </div>
          </div>

          {/* Categorized Suggestions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Critical Issues 🔴 */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Kritik Hatalar ({activeReview.suggestions.criticalIssues.length})
              </h4>
              <ul className="space-y-1 text-xs text-rose-300/90 list-disc pl-4">
                {activeReview.suggestions.criticalIssues.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Improvements 🟡 */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-200">
                <TrendingUp className="w-4 h-4 text-amber-400" /> Geliştirilecek Yanlar ({activeReview.suggestions.improvements.length})
              </h4>
              <ul className="space-y-1 text-xs text-amber-300/90 list-disc pl-4">
                {activeReview.suggestions.improvements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section-by-Section Analysis Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bölüm Bölüm Detaylı Özgeçmiş İncelemesi
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeReview.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{section.sectionName}</span>
                    <span className={`px-2 py-0.5 rounded-md border text-[10px] font-extrabold ${getScoreColor(section.score)}`}>
                      {section.score} / 100
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{section.feedback}</p>

                  {section.strengths.length > 0 && (
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{section.strengths.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

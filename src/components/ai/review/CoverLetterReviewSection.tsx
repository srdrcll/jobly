import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck,
  TrendingUp
} from 'lucide-react';
import { useReviewCoverLetterMutation, useCoverLetterReviewsQuery } from '@/hooks/queries/useAiReviewQuery';
import { CoverLetterReviewRecord } from '@/types/aiReview';
import { Button } from '@/components/ui/Button';

export const CoverLetterReviewSection: React.FC = () => {
  const { data: reviews = [] } = useCoverLetterReviewsQuery();
  const reviewMutation = useReviewCoverLetterMutation();

  const [title, setTitle] = useState('Senior Frontend Developer — Ön Mektup');
  const [contentText, setContentText] = useState(
    'Sayın İşe Alım Yöneticisi,\n\nŞirketiniz ekibinde yayınlanan Senior Frontend Developer pozisyonunu büyük bir heyecanla inceledim. 7 yılı aşkın süredir React 19, TypeScript ve mikro-frontend mimarileri geliştiren bir yazılım mühendisi olarak, kullanıcı odaklı yüksek performanslı web uygulamaları inşa etme konusundaki birikimimle ekibinize değer katabileceğime inanıyorum.\n\nKariyerim boyunca yüksek trafikli SaaS platformlarında sayfa yükleme sürelerini %35 düşürdüm ve tasarım sistemlerini (Design System) standardize ettim. Şirketinizin teknoloji vizyonuna katkı sağlamak isterim.\n\nZaman ayırdığınız için teşekkür eder, mülakat fırsatını değerlendirmekten memnuniyet duyarım.\n\nSaygılarımla,\nSerdar Çil'
  );

  const [activeReview, setActiveReview] = useState<CoverLetterReviewRecord | null>(() => reviews[0] || null);

  const handleRunReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentText.trim()) return;

    reviewMutation.mutate(
      { title: title || 'Ön Mektup', contentText },
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
      {/* 1. Cover Letter Input Panel */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Ön Mektup (Cover Letter) Yapay Zekâ Analizi</h3>
              <p className="text-xs text-slate-400">Hitap tonu, netlik, dilbilgisi ve kişiselleştirme incelemesi</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleRunReview} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Mektup Başlığı / Başvurulan Pozisyon</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-foreground focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Ön Mektup Metni *</label>
            <textarea
              rows={6}
              required
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="Ön mektup taslağınızı buraya yapıştırın..."
              className="w-full p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-sans"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={reviewMutation.isPending}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md"
            >
              Ön Mektubu Değerlendir
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Evaluation Results */}
      {activeReview && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card with Overall Score */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft dark:shadow-soft-dark flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-black text-foreground">Ön Mektup İnceleme Raporu</h3>
              </div>
              <p className="text-xs text-slate-400">
                Versiyon #{activeReview.version} — {activeReview.title} ({new Date(activeReview.createdAt).toLocaleDateString('tr-TR')})
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className={`p-4 rounded-2xl border text-center ${getScoreColor(activeReview.overallScore)}`}>
                <span className="text-3xl font-black">{activeReview.overallScore}</span>
                <span className="text-xs font-bold block">/ 100 Kalite Skoru</span>
              </div>
            </div>
          </div>

          {/* 6 Dimensions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Dilbilgisi & İmla', score: activeReview.grammarScore },
              { label: 'Netlik & Okunabilirlik', score: activeReview.clarityScore },
              { label: 'Hitap & Ton', score: activeReview.toneScore },
              { label: 'Kişiselleştirme', score: activeReview.personalizationScore },
              { label: 'ATS Geçirgenliği', score: activeReview.atsScore },
              { label: 'Düzen & Yapı', score: activeReview.structureScore },
            ].map((dim, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <span className="text-xs font-bold text-foreground">{dim.label}</span>
                <span className={`px-2 py-0.5 rounded-md border text-[11px] font-black ${getScoreColor(dim.score)}`}>
                  %{dim.score}
                </span>
              </div>
            ))}
          </div>

          {/* Categorized Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeReview.suggestions.criticalIssues.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-rose-200">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Kritik Öneriler
                </h4>
                <ul className="space-y-1 text-xs text-rose-300/90 list-disc pl-4">
                  {activeReview.suggestions.criticalIssues.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-200">
                <TrendingUp className="w-4 h-4 text-amber-400" /> Geliştirme Fırsatları
              </h4>
              <ul className="space-y-1 text-xs text-amber-300/90 list-disc pl-4">
                {activeReview.suggestions.improvements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

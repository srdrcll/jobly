import React, { useState } from 'react';
import { Star, Award, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { 
  InterviewEvaluationData, 
  getInterviewEvaluation, 
  saveInterviewEvaluation 
} from '@/utils/interviewCrmPrepUtils';
import { Button } from '@/components/ui/Button';

interface InterviewEvaluationSectionProps {
  interviewId: string;
}

export const InterviewEvaluationSection: React.FC<InterviewEvaluationSectionProps> = ({ interviewId }) => {
  const [evalData, setEvalData] = useState<InterviewEvaluationData>(() => {
    const existing = getInterviewEvaluation(interviewId);
    if (existing) return existing;
    return {
      interviewId,
      overallRating: 4,
      technicalRating: 4,
      communicationRating: 5,
      confidenceRating: 4,
      difficultyLevel: 'Orta',
      outcome: 'Pending',
      strengths: 'Mimarileri ve React Server Components mimarisini akıcı şekilde aktarabildim.',
      weaknesses: 'System Design ölçeklenme sorusunda bazı önbellek detaylarında tereddüt ettim.',
      lessonsLearned: 'Redis önbellek invalidation stratejilerini tekrar etmeliyim.',
      improvementPlan: 'Gelecek teknik mülakat öncesi 2 adet mock System Design pratiği yap.',
      evaluatedAt: new Date().toISOString(),
    };
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...evalData, evaluatedAt: new Date().toISOString() };
    saveInterviewEvaluation(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const renderStarSelector = (label: string, value: number, onChange: (val: number) => void) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-115 transition-transform"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-bold text-amber-400 ml-1.5">{value}/5</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Görüşme Sonrası Değerlendirme & Öz Eleştiri</h3>
            <p className="text-xs text-slate-400">Performans puanı, çıkarılan dersler ve gelişim planı</p>
          </div>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Değerlendirme Kaydedildi!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Star Rating Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {renderStarSelector('Genel Mülakat Performansı', evalData.overallRating, (val) =>
            setEvalData({ ...evalData, overallRating: val })
          )}
          {renderStarSelector('Teknik Beceri & Kodlama', evalData.technicalRating, (val) =>
            setEvalData({ ...evalData, technicalRating: val })
          )}
          {renderStarSelector('İletişim & İfade Yeteneği', evalData.communicationRating, (val) =>
            setEvalData({ ...evalData, communicationRating: val })
          )}
          {renderStarSelector('Özgüven & Duruş', evalData.confidenceRating, (val) =>
            setEvalData({ ...evalData, confidenceRating: val })
          )}
        </div>

        {/* Difficulty Level & Outcome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Mülakat Zorluk Seviyesi</label>
            <select
              value={evalData.difficultyLevel}
              onChange={(e) => setEvalData({ ...evalData, difficultyLevel: e.target.value as any })}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-bold focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="Kolay">🟢 Kolay</option>
              <option value="Orta">🔵 Orta</option>
              <option value="Zor">🟡 Zor</option>
              <option value="Zorlayıcı">🔴 Çok Zorlayıcı</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Tahmini Görüşme Sonucu</label>
            <select
              value={evalData.outcome}
              onChange={(e) => setEvalData({ ...evalData, outcome: e.target.value as any })}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-extrabold focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="Pending">⏳ Sonuç Bekleniyor</option>
              <option value="Passed">✅ Başarılı / Aşama Geçildi</option>
              <option value="Failed">❌ Olumsuz</option>
              <option value="Offer">🏆 İş Teklifi Geldi</option>
            </select>
          </div>
        </div>

        {/* Qualitative Text Areas */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Güçlü Sergilenen Yanlar
            </label>
            <textarea
              rows={2}
              value={evalData.strengths}
              onChange={(e) => setEvalData({ ...evalData, strengths: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Zayıf / Geliştirilecek Alanlar
            </label>
            <textarea
              rows={2}
              value={evalData.weaknesses}
              onChange={(e) => setEvalData({ ...evalData, weaknesses: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Çıkarılan Dersler & Aksiyon Planı
            </label>
            <textarea
              rows={2}
              value={evalData.improvementPlan}
              onChange={(e) => setEvalData({ ...evalData, improvementPlan: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button type="submit" variant="primary" size="sm">
            Değerlendirmeyi Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

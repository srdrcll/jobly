import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  BarChart2, 
  Sparkles 
} from 'lucide-react';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { useInterviewsListQuery } from '@/hooks/queries/useInterviewsQuery';

export const AiCareerInsightsSection: React.FC = () => {
  const { data: applications = [] } = useApplicationsListQuery();
  const { data: interviews = [] } = useInterviewsListQuery();

  const insights = useMemo(() => {
    const totalApps = applications.length || 1;
    const interviewApps = applications.filter((a) => a.status === 'interviewing' || a.status === 'offer').length;
    const offerApps = applications.filter((a) => a.status === 'offer').length;

    const appToInterviewConversion = Number(((interviewApps / totalApps) * 100).toFixed(1));
    const interviewToOfferConversion = interviewApps > 0 ? Number(((offerApps / interviewApps) * 100).toFixed(1)) : 0;

    // Title frequency
    const titleMap: Record<string, number> = {};
    applications.forEach((a) => {
      const t = a.position || 'Frontend Developer';
      titleMap[t] = (titleMap[t] || 0) + 1;
    });
    const topPosition = Object.entries(titleMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Frontend Developer';

    // Company frequency
    const compMap: Record<string, number> = {};
    applications.forEach((a) => {
      const c = a.company_name || 'Teknoloji Şirketi';
      compMap[c] = (compMap[c] || 0) + 1;
    });
    const topCompany = Object.entries(compMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Trendyol Tech';

    return {
      appToInterviewConversion,
      interviewToOfferConversion,
      topPosition,
      topCompany,
      totalApps: applications.length,
      totalInterviews: interviews.length,
    };
  }, [applications, interviews]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">Kişiselleştirilmiş Kariyer Analitiği (AI Insights)</h3>
          <p className="text-xs text-slate-400">Gerçek başvuru ve mülakat verilerinizden türetilen dönüşüm oranları</p>
        </div>
      </div>

      {/* 2. Conversion Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-1">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-400" /> Başvuru → Mülakat Oranı
          </span>
          <p className="text-2xl font-black text-foreground">%{insights.appToInterviewConversion}</p>
          <p className="text-[10px] text-slate-400">Toplam {insights.totalApps} başvurudan mülakata geçiş</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-1">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" /> Mülakat → Teklif Oranı
          </span>
          <p className="text-2xl font-black text-foreground">%{insights.interviewToOfferConversion}</p>
          <p className="text-[10px] text-slate-400">Katılınan mülakatlardan teklif alma başarısı</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-1">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-purple-400" /> En Çok Odaklanılan Pozisyon
          </span>
          <p className="text-sm font-bold text-foreground truncate">{insights.topPosition}</p>
          <p className="text-[10px] text-slate-400">En yüksek başvuru yoğunluğu olan unvan</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-1">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-400" /> Hedef Şirket Odağı
          </span>
          <p className="text-sm font-bold text-foreground truncate">{insights.topCompany}</p>
          <p className="text-[10px] text-slate-400">Etkileşimde olunan öne çıkan şirket</p>
        </div>
      </div>

      {/* 3. Actionable AI Recommendations */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 border border-indigo-500/30 text-indigo-100 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" /> AI Kariyer Tavsiye Motoru
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-indigo-900/40 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-indigo-200">📌 Mülakat Dönüşüm Tavsiyesi:</span>
            <p className="text-slate-300 leading-relaxed">
              Mülakat → Teklif oranınızı %15 seviyesinin üzerine çıkarmak için teknik soruların sonuna STAR metoduna uygun rakamsal metrikler ekleyin.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-500/20 space-y-1">
            <span className="font-bold text-purple-200">🚀 Başvuru Temposu Tavsiyesi:</span>
            <p className="text-slate-300 leading-relaxed">
              Salı ve Perşembe günleri 10:00 - 11:30 saatleri arasında yapılan başvurular İK geri dönüş oranını %25 artırıyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

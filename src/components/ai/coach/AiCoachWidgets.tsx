import React from 'react';
import { Target, Sparkles, Award, Zap } from 'lucide-react';
import { useAiCareerGoalsQuery } from '@/hooks/queries/useAiCoachQuery';

export const AiCoachWidgets: React.FC = () => {
  const { data: goals = [] } = useAiCareerGoalsQuery();

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const goalProgressPct = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 65;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
      {/* Widget 1: Career Goal Progress */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Kariyer Hedef İlerlemesi</span>
            <p className="text-lg font-black text-foreground">%{goalProgressPct} Tamamlandı</p>
          </div>
        </div>
      </div>

      {/* Widget 2: Interview Readiness Score */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Mülakat Hazırlık Skoru</span>
            <p className="text-lg font-black text-foreground">88 / 100 (Yüksek)</p>
          </div>
        </div>
      </div>

      {/* Widget 3: Weekly Recommendations */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Haftalık Aksiyon</span>
            <p className="text-sm font-bold text-foreground">2 Mülakat Simülasyonu</p>
          </div>
        </div>
      </div>

      {/* Widget 4: AI Insights Status */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Dönüşüm Trendi</span>
            <p className="text-sm font-bold text-emerald-400">+%12 Yükselişte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

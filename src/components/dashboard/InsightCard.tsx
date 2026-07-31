import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  Award, 
  Clock 
} from 'lucide-react';
import { DynamicInsight } from '@/utils/insightsUtils';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  insight: DynamicInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getIcon = () => {
    switch (insight.iconName) {
      case 'TrendingUp':
        return TrendingUp;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'Target':
        return Target;
      case 'Award':
        return Award;
      case 'Clock':
        return Clock;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  const getTypeStyles = () => {
    switch (insight.type) {
      case 'success':
        return {
          cardBg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-500/30',
          iconBg: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300/50 dark:border-emerald-500/20',
          badgeBg: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300/50 dark:border-emerald-500/30',
          titleColor: 'text-emerald-700 dark:text-emerald-300',
        };
      case 'warning':
        return {
          cardBg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-300/60 dark:border-amber-500/30',
          iconBg: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300/50 dark:border-amber-500/20',
          badgeBg: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-300/50 dark:border-amber-500/30',
          titleColor: 'text-amber-700 dark:text-amber-300',
        };
      case 'info':
        return {
          cardBg: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-300/60 dark:border-indigo-500/30',
          iconBg: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-300/50 dark:border-indigo-500/20',
          badgeBg: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30',
          titleColor: 'text-indigo-700 dark:text-indigo-300',
        };
      case 'tip':
      default:
        return {
          cardBg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-300/60 dark:border-purple-500/30',
          iconBg: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300/50 dark:border-purple-500/20',
          badgeBg: 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-300/50 dark:border-purple-500/30',
          titleColor: 'text-purple-700 dark:text-purple-300',
        };
    }
  };

  const Icon = getIcon();
  const styles = getTypeStyles();

  return (
    <div
      className={cn(
        'p-4 rounded-xl border space-y-2 transition-all duration-300 hover:scale-[1.01]',
        styles.cardBg
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={cn('p-1.5 rounded-lg border shrink-0', styles.iconBg)} aria-hidden="true">
            <Icon className="w-4 h-4" />
          </div>
          <h4 className={cn('text-xs font-bold truncate', styles.titleColor)}>
            {insight.title}
          </h4>
        </div>
        <span className={cn('px-2 py-0.5 rounded-full border text-[10px] font-extrabold shrink-0', styles.badgeBg)}>
          {insight.badge}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
        {insight.description}
      </p>
    </div>
  );
};

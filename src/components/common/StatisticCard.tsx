import React, { ComponentType } from 'react';
import { LucideProps, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatisticCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  timeframe?: string;
  icon: ComponentType<LucideProps>;
  description?: string;
  className?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  timeframe = 'bu ay',
  icon: Icon,
  description,
  className,
}) => {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  return (
    <div
      className={cn(
        'group p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft dark:shadow-soft-dark hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden',
        className
      )}
    >
      {/* Background Accent Glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" aria-hidden="true" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors" aria-hidden="true">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              'inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border',
              isPositive && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
              isNegative && 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
              !isPositive && !isNegative && 'bg-slate-500/10 text-slate-500 border-slate-500/20'
            )}
          >
            {isPositive && <TrendingUp className="w-3 h-3" aria-hidden="true" />}
            {isNegative && <TrendingDown className="w-3 h-3" aria-hidden="true" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" aria-hidden="true" />}
            <span>{change}</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{description || 'Toplam takip edilen veri'}</span>
        {timeframe && <span className="font-medium opacity-80">{timeframe}</span>}
      </div>
    </div>
  );
};

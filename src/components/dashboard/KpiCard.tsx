import React, { ComponentType } from 'react';
import { LucideProps, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardSkeleton } from '@/components/ui/Skeleton';

export interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  helperText?: string;
  icon: ComponentType<LucideProps>;
  iconBgClass?: string;
  iconTextClass?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  helperText = 'Sistem verilerine dayanmaktadır',
  icon: Icon,
  iconBgClass = 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300',
  isLoading = false,
  className,
  onClick,
}) => {
  if (isLoading) {
    return <CardSkeleton className={className} />;
  }

  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  return (
    <div
      onClick={onClick}
      className={cn(
        'group p-5 rounded-3xl bg-white/80 dark:bg-[#0D1424]/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/70 shadow-soft dark:shadow-soft-dark hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-card-hover dark:hover:shadow-card-hover-dark hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between specular-border',
        onClick && 'cursor-pointer hover:border-blue-500/50 dark:hover:border-blue-500/50 select-none active:scale-[0.98]',
        className
      )}
    >
      {/* Subtle Background Accent Glow */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header & Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-normal">
          {title}
        </span>
        <div
          className={cn(
            'p-2.5 rounded-xl transition-transform group-hover:scale-110 shrink-0',
            iconBgClass
          )}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Value & Change Badge */}
      <div className="flex items-baseline justify-between gap-2 my-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border shrink-0',
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

      {/* Small Trend / Helper Text */}
      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="whitespace-normal">{helperText}</span>
      </div>
    </div>
  );
};

import React, { ComponentType } from 'react';
import { LucideProps, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionCardProps {
  title: string;
  description: string;
  ctaText: string;
  icon: ComponentType<LucideProps>;
  iconBgClass?: string;
  onClick: () => void;
  primary?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  ctaText,
  icon: Icon,
  iconBgClass = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  onClick,
  primary = false,
}) => {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:-translate-y-1 shadow-soft dark:shadow-soft-dark relative overflow-hidden',
        primary
          ? 'bg-gradient-to-br from-blue-500/10 via-white to-cyan-500/5 dark:from-blue-950/70 dark:via-slate-900 dark:to-slate-950 border-blue-300/60 dark:border-blue-500/30 shadow-blue-500/10 shadow-lg'
          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
      )}
    >
      {/* Background Ambient Accent Glow */}
      <div
        className="absolute -right-8 -bottom-8 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors pointer-events-none"
        aria-hidden="true"
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className={cn('p-2.5 rounded-xl border transition-transform group-hover:scale-110 shrink-0', iconBgClass)}>
            <Icon className="w-5 h-5" />
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
        <span>{ctaText}</span>
        <span>→</span>
      </div>
    </div>
  );
};

import React, { ComponentType, ReactNode } from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ComponentType<LucideProps>;
  actionSlot?: ReactNode;
  badge?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  actionSlot,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800/80',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl shadow-sm shrink-0" aria-hidden="true">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            {badge && (
              <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {actionSlot && (
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {actionSlot}
        </div>
      )}
    </div>
  );
};

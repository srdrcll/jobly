import React, { ComponentType, ReactNode } from 'react';
import { LucideProps, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: ComponentType<LucideProps>;
  title: string;
  description: string;
  actionSlot?: ReactNode;
  secondaryActionSlot?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderOpen,
  title,
  description,
  actionSlot,
  secondaryActionSlot,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 my-4',
        className
      )}
    >
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 mb-4 shadow-inner" aria-hidden="true">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {(actionSlot || secondaryActionSlot) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actionSlot}
          {secondaryActionSlot}
        </div>
      )}
    </div>
  );
};

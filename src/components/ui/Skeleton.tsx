import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-800/80 rounded-lg';

  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'h-32 w-full rounded-2xl border border-slate-200 dark:border-slate-800 p-4',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-4 animate-pulse" aria-hidden="true">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
        <div className="space-y-2">
          <Skeleton variant="text" className="w-32 h-4" />
          <Skeleton variant="text" className="w-20 h-3" />
        </div>
      </div>
      <Skeleton variant="rectangular" className="w-16 h-6 rounded-full" />
    </div>
    <Skeleton variant="text" className="w-full h-3" />
    <Skeleton variant="text" className="w-2/3 h-3" />
    <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800/60">
      <Skeleton variant="text" className="w-24 h-3" />
      <Skeleton variant="rectangular" className="w-20 h-8 rounded-xl" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 animate-pulse gap-4" aria-hidden="true">
    <div className="flex items-center gap-3 flex-1">
      <Skeleton variant="circular" className="w-9 h-9 shrink-0" />
      <div className="space-y-1.5 flex-1 max-w-xs">
        <Skeleton variant="text" className="w-3/4 h-4" />
        <Skeleton variant="text" className="w-1/2 h-3" />
      </div>
    </div>
    <Skeleton variant="rectangular" className="w-24 h-6 rounded-lg hidden sm:block" />
    <Skeleton variant="rectangular" className="w-20 h-6 rounded-lg" />
    <Skeleton variant="circular" className="w-8 h-8 shrink-0" />
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="space-y-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 shadow-sm">
    <TableRowSkeleton />
    <TableRowSkeleton />
    <TableRowSkeleton />
    <TableRowSkeleton />
    <TableRowSkeleton />
  </div>
);

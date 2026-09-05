import React, { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Table = React.forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-soft">
      <table
        ref={ref}
        className={cn('w-full text-left text-sm border-collapse', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none', className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-300', className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors duration-150 group',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('px-4 py-3.5 text-slate-500 dark:text-slate-400 font-semibold', className)}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('px-4 py-4 align-middle text-xs font-medium text-foreground', className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

import React, { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerClassName,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={cn('space-y-1.5 w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-600 dark:text-slate-300 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0 flex items-center justify-center" aria-hidden="true">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={cn(
              'w-full h-10 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              error && 'border-rose-500/80 focus:ring-rose-500/40 focus:border-rose-500',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-slate-500 shrink-0 flex items-center justify-center" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-[11px] text-rose-400 font-medium" role="alert" aria-live="assertive">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

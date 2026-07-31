import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98] select-none';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 shadow-md shadow-slate-900/10 font-semibold',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800',
      outline: 'bg-transparent border border-slate-300 dark:border-slate-700/80 text-foreground hover:bg-slate-100 dark:hover:bg-slate-800/60',
      ghost: 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50',
      destructive: 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 dark:bg-rose-600 dark:hover:bg-rose-500',
      link: 'bg-transparent text-slate-900 dark:text-slate-100 underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
      md: 'text-sm px-4 py-2.5 h-10 gap-2',
      lg: 'text-base px-6 py-3.5 h-12 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== 'link' && sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
        ) : null}
        
        <span>{children}</span>

        {!isLoading && rightIcon && <span className="shrink-0" aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

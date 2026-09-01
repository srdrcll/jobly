import React from 'react';
import { cn } from '@/lib/utils';

interface JoblyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  classNameIcon?: string;
}

export const JoblyLogo: React.FC<JoblyLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle,
  className,
  classNameIcon,
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', dot: 'w-1.5 h-1.5' },
    md: { icon: 'w-9 h-9', text: 'text-lg', dot: 'w-2 h-2' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl', dot: 'w-2.5 h-2.5' },
    xl: { icon: 'w-14 h-14', text: 'text-3xl', dot: 'w-3 h-3' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5 select-none group', className)}>
      {/* Sleek Minimalist Geometric Vector Mark */}
      <div
        className={cn(
          'relative rounded-xl bg-slate-900 border border-slate-700/60 dark:border-white/10 p-1.5 shadow-md shadow-blue-500/10 group-hover:shadow-blue-500/25 group-hover:border-blue-500/50 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 overflow-hidden',
          currentSize.icon,
          classNameIcon
        )}
      >
        {/* Subtle Ambient Radial Glow inside Icon */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-cyan-400/30 opacity-70 group-hover:opacity-100 transition-opacity" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-sm"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="joblyPrimaryGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="joblyAccentGrad" x1="18" y1="4" x2="32" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Upward Career Trajectory Arrow / Modern J Upper Arc */}
          <path
            d="M8 8C8 6.89543 8.89543 6 10 6H26C27.1046 6 28 6.89543 28 8V11C28 12.1046 27.1046 13 26 13H14C12.8954 13 12 13.8954 12 15V22C12 25.3137 14.6863 28 18 28C21.3137 28 24 25.3137 24 22V17C24 15.8954 24.8954 15 26 15H27C28.1046 15 29 15.8954 29 17V22C29 28.0751 24.0751 33 18 33C11.9249 33 7 28.0751 7 22V10C7 8.89543 7.89543 8 8 8Z"
            fill="url(#joblyPrimaryGrad)"
          />

          {/* Dynamic Momentum Diamond / Spark */}
          <rect
            x="24"
            y="5"
            width="6"
            height="6"
            rx="2"
            transform="rotate(45 24 5)"
            fill="url(#joblyAccentGrad)"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col min-w-0 leading-none">
          <div className="flex items-center gap-1">
            <span className={cn('font-black tracking-tight text-foreground flex items-center', currentSize.text)}>
              Job<span className="text-blue-500">ly</span>
            </span>
            <span className={cn('rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse', currentSize.dot)} />
          </div>
          {subtitle && (
            <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

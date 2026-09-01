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
    <div className={cn('flex items-center gap-3 select-none group', className)}>
      {/* Sleek Modern Gradient Squircle Badge */}
      <div
        className={cn(
          'relative rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-1.5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0',
          currentSize.icon,
          classNameIcon
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
          aria-hidden="true"
        >
          {/* Subtle Inner Glass Ring */}
          <rect
            x="1.5"
            y="1.5"
            width="29"
            height="29"
            rx="7"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
            fill="none"
          />

          {/* Clean, Bold, True 'J' Lettermark */}
          <path
            d="M19 8C19 6.89543 19.8954 6 21 6H22C23.1046 6 24 6.89543 24 8V18C24 22.4183 20.4183 26 16 26C12.6863 26 10 23.3137 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22C18.2091 22 20 20.2091 20 18V8C20 8 19.5 8 19 8Z"
            fill="#FFFFFF"
          />

          {/* Bright Cyan Momentum Accent / Spark */}
          <circle cx="21.5" cy="8.5" r="2" fill="#38BDF8" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col min-w-0 leading-none">
          <div className="flex items-center gap-1">
            <span className={cn('font-black tracking-tight text-foreground flex items-center', currentSize.text)}>
              Job<span className="text-blue-500">ly</span>
            </span>
            <span className={cn('rounded-full bg-blue-500 animate-pulse', currentSize.dot)} />
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

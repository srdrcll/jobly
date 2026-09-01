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
    sm: { icon: 'w-7 h-7', text: 'text-base', star: 'scale-75' },
    md: { icon: 'w-9 h-9', text: 'text-lg', star: 'scale-90' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl', star: 'scale-100' },
    xl: { icon: 'w-14 h-14', text: 'text-3xl', star: 'scale-125' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5 select-none group', className)}>
      {/* Dynamic Stylized Vector Logo Mark */}
      <div
        className={cn(
          'relative rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0',
          currentSize.icon,
          classNameIcon
        )}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5 drop-shadow-sm"
          aria-hidden="true"
        >
          {/* Inner Specular Highlight */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="12"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Stylized Modern Letter J */}
          <path
            d="M29 13V28C29 32.4183 25.4183 36 21 36C17.6863 36 15 33.3137 15 30C15 28.3431 16.3431 27 18 27C19.6569 27 21 28.3431 21 30C21 30.5523 21.4477 31 22 31C23.6569 31 25 29.6569 25 28V13C25 11.8954 25.8954 11 27 11H27C28.1046 11 29 11.8954 29 13Z"
            fill="#FFFFFF"
          />
          {/* Career Spark Star */}
          <path
            d="M34 9L35.5 13L39.5 14.5L35.5 16L34 20L32.5 16L28.5 14.5L32.5 13L34 9Z"
            fill="#38BDF8"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col min-w-0 leading-none">
          <span className={cn('font-extrabold tracking-tight text-foreground flex items-center', currentSize.text)}>
            Job<span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">ly</span>
          </span>
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

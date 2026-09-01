import React from 'react';
import { ApplicationStatus } from '@/types';
import { STATUS_CONFIG } from '@/constants/status';
import { cn } from '@/lib/utils';
import { 
  Bookmark, 
  Send, 
  MessageSquare,
  Users, 
  FileCode2, 
  PartyPopper, 
  XCircle 
} from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showDot?: boolean;
  className?: string;
}

const STATUS_ICONS: Record<ApplicationStatus, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  saved: Bookmark,
  applied: Send,
  contacted: MessageSquare,
  interview: Users,
  case_study: FileCode2,
  offer: PartyPopper,
  rejected: XCircle,
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  showDot = false,
  className,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.applied;
  const IconComponent = STATUS_ICONS[status] || STATUS_ICONS.applied;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium rounded-full shadow-2xs',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold rounded-full shadow-xs',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold rounded-full shadow-sm',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border transition-all duration-200 backdrop-blur-sm select-none',
        config.bgClass,
        config.textClass,
        config.borderClass,
        sizeClasses[size],
        className
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', config.dotClass)} aria-hidden="true" />
      )}
      {showIcon && IconComponent && (
        <IconComponent className={cn('shrink-0 opacity-90', iconSizes[size])} aria-hidden="true" />
      )}
      <span>{config.label}</span>
    </span>
  );
};

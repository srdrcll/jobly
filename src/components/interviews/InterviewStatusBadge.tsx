import React from 'react';
import { Clock, CheckCircle2, XCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InterviewResultType = 'Pending' | 'Passed' | 'Failed' | 'Offer';

interface InterviewStatusBadgeProps {
  result: InterviewResultType | string | null;
  className?: string;
}

export const InterviewStatusBadge: React.FC<InterviewStatusBadgeProps> = ({ result, className }) => {
  const getBadgeConfig = () => {
    switch (result) {
      case 'Passed':
        return {
          label: 'Olumlu / Geçti',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: CheckCircle2,
        };
      case 'Failed':
        return {
          label: 'Olumsuz',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          icon: XCircle,
        };
      case 'Offer':
        return {
          label: 'Teklif Alındı 🏆',
          bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: Award,
        };
      case 'Pending':
      default:
        return {
          label: 'Sonuç Bekleniyor',
          bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          icon: Clock,
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold shrink-0',
        config.bg,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
};

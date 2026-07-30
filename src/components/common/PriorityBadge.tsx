import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldAlert, Shield, ArrowUp, ArrowDown } from 'lucide-react';

export type PriorityLevel = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik' | 'Low' | 'Medium' | 'High' | 'Critical';

interface PriorityBadgeProps {
  priority?: PriorityLevel | string | null;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority = 'Orta', className }) => {
  const p = priority?.toString() || 'Orta';

  let label = 'Orta';
  let badgeStyle = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  let Icon = Shield;

  if (p === 'Düşük' || p.toLowerCase() === 'low') {
    label = 'Düşük';
    badgeStyle = 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    Icon = ArrowDown;
  } else if (p === 'Yüksek' || p.toLowerCase() === 'high') {
    label = 'Yüksek';
    badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    Icon = ArrowUp;
  } else if (p === 'Kritik' || p.toLowerCase() === 'critical') {
    label = 'Kritik';
    badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    Icon = ShieldAlert;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full border select-none',
        badgeStyle,
        className
      )}
    >
      <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};

import React from 'react';
import { Target, Send, Users, Award, Archive, Search, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CompanyStatusType = 
  | 'Target' 
  | 'Applied' 
  | 'Interviewed' 
  | 'Offer' 
  | 'Archived' 
  | 'Researching' 
  | 'Contacted';

interface CompanyStatusBadgeProps {
  status: CompanyStatusType | string | null;
  className?: string;
}

export const CompanyStatusBadge: React.FC<CompanyStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Target':
        return {
          label: 'Hedef Şirket',
          bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          icon: Target,
        };
      case 'Applied':
        return {
          label: 'Başvuruldu',
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          icon: Send,
        };
      case 'Interviewed':
        return {
          label: 'Mülakat Sürecinde',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: Users,
        };
      case 'Offer':
        return {
          label: 'Teklif Alındı',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: Award,
        };
      case 'Archived':
        return {
          label: 'Arşivlendi',
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
          icon: Archive,
        };
      case 'Researching':
        return {
          label: 'Araştırılıyor',
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: Search,
        };
      case 'Contacted':
        return {
          label: 'İletişime Geçildi',
          bg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
          icon: PhoneCall,
        };
      default:
        return {
          label: status || 'Hedef Şirket',
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
          icon: Target,
        };
    }
  };

  const config = getStatusConfig();
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

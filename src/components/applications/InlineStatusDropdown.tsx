import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ApplicationStatus } from '@/types';
import { STATUS_CONFIG } from '@/constants/status';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface InlineStatusDropdownProps {
  currentStatus: ApplicationStatus;
  onSelectStatus: (newStatus: ApplicationStatus) => void;
  disabled?: boolean;
}

const AVAILABLE_STATUSES: ApplicationStatus[] = [
  'applied',
  'interview',
  'case_study',
  'offer',
  'rejected',
  'saved',
];

export const InlineStatusDropdown: React.FC<InlineStatusDropdownProps> = ({
  currentStatus,
  onSelectStatus,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (status: ApplicationStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== currentStatus) {
      onSelectStatus(status);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        title="Durumu 1 Tıkla Değiştir"
        className="group/status inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full transition-transform active:scale-95"
      >
        <StatusBadge status={currentStatus} size="sm" showIcon showDot />
        <ChevronDown className="w-3 h-3 text-slate-400 group-hover/status:text-foreground opacity-60 group-hover/status:opacity-100 transition-all -ml-0.5" />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-1.5 w-44 bg-white/95 dark:bg-[#0E1424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-xl z-50 p-1.5 space-y-1 animate-fadeIn specular-border"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/60 mb-1">
            Durumu Güncelle (1-Tık)
          </div>
          {AVAILABLE_STATUSES.map((st) => {
            const config = STATUS_CONFIG[st] || STATUS_CONFIG.applied;
            const isSelected = st === currentStatus;
            return (
              <button
                key={st}
                type="button"
                onClick={(e) => handleSelect(st, e)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600/15 text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
                  <span>{config.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

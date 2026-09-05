import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Clock, CheckCircle2, XCircle, Award } from 'lucide-react';
import { InterviewStatusBadge, InterviewResultType } from './InterviewStatusBadge';

interface InlineInterviewResultDropdownProps {
  currentResult: string | null;
  onSelectResult: (newResult: InterviewResultType) => void;
  disabled?: boolean;
}

const AVAILABLE_RESULTS: { id: InterviewResultType; label: string; icon: any; color: string }[] = [
  { id: 'Pending', label: 'Sonuç Bekleniyor', icon: Clock, color: 'text-indigo-400' },
  { id: 'Passed', label: 'Olumlu / Geçti', icon: CheckCircle2, color: 'text-emerald-400' },
  { id: 'Offer', label: 'Teklif Alındı 🏆', icon: Award, color: 'text-amber-400' },
  { id: 'Failed', label: 'Olumsuz', icon: XCircle, color: 'text-rose-400' },
];

export const InlineInterviewResultDropdown: React.FC<InlineInterviewResultDropdownProps> = ({
  currentResult,
  onSelectResult,
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

  const handleSelect = (resultId: InterviewResultType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (resultId !== currentResult) {
      onSelectResult(resultId);
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
        title="Sonucu 1 Tıkla Değiştir"
        className="group/interview inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full transition-transform active:scale-95"
      >
        <InterviewStatusBadge result={currentResult || 'Pending'} />
        <ChevronDown className="w-3 h-3 text-slate-400 group-hover/interview:text-foreground opacity-60 group-hover/interview:opacity-100 transition-all -ml-0.5" />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-1.5 w-48 bg-white/95 dark:bg-[#18243E]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/60 rounded-2xl shadow-xl z-50 p-1.5 space-y-1 animate-fadeIn specular-border"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/60 mb-1">
            Mülakat Sonucu (1-Tık)
          </div>
          {AVAILABLE_RESULTS.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === (currentResult || 'Pending');
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleSelect(item.id, e)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600/15 text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.label}</span>
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

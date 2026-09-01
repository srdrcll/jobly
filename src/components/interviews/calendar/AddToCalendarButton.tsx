import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ExternalLink, 
  Download, 
  ChevronDown,
  Globe,
  Mail
} from 'lucide-react';
import { DbInterview } from '@/types';
import { 
  generateGoogleCalendarUrl, 
  generateOutlookCalendarUrl, 
  generateIcsContent, 
  downloadIcsFile 
} from '@/utils/calendarIntegrationUtils';
import { Button } from '@/components/ui/Button';

interface AddToCalendarButtonProps {
  interview: DbInterview;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  className?: string;
}

export const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({
  interview,
  variant = 'outline',
  size = 'sm',
  iconOnly = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateGoogleCalendarUrl(interview);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleOutlookCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateOutlookCalendarUrl(interview);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleDownloadIcs = (e: React.MouseEvent) => {
    e.stopPropagation();
    const icsContent = generateIcsContent(interview);
    const filename = `Mulakat_${interview.company_name.replace(/\s+/g, '_')}_${interview.date || 'randevu'}.ics`;
    downloadIcsFile(filename, icsContent);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      {iconOnly ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-400 transition-colors"
          title="Takvime Ekle (Google, Outlook, iCal)"
          aria-label="Takvime Ekle"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
      ) : (
        <Button
          variant={variant}
          size={size}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          aria-haspopup="true"
          aria-expanded={isOpen}
          leftIcon={<CalendarIcon className="w-3.5 h-3.5 text-purple-400" />}
          rightIcon={<ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        >
          Takvime Ekle
        </Button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 z-50 animate-fadeIn text-left text-xs font-semibold"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Takvim Seçeneği
          </div>

          <button
            type="button"
            onClick={handleGoogleCalendar}
            className="w-full px-3.5 py-2.5 text-left text-slate-700 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-between transition-colors"
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Google Calendar</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={handleOutlookCalendar}
            className="w-full px-3.5 py-2.5 text-left text-slate-700 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-between transition-colors"
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-500" />
              <span>Outlook Web</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className="w-full px-3.5 py-2.5 text-left text-slate-700 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-between transition-colors border-t border-slate-100 dark:border-slate-800/60"
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="block">Apple / iCal Dosyası</span>
                <span className="text-[10px] text-slate-400 font-normal">(.ics indir)</span>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

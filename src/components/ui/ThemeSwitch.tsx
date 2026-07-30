import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode } from '@/types';
import { cn } from '@/lib/utils';

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }> }[] = [
    { mode: 'dark', label: 'Koyu Tema', icon: Moon },
    { mode: 'light', label: 'Açık Tema', icon: Sun },
    { mode: 'system', label: 'Sistem', icon: Laptop },
  ];

  const currentOption = options.find((opt) => opt.mode === theme) || options[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-foreground transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        title="Tema Değiştir"
        aria-label="Tema Seçimi"
      >
        <CurrentIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl z-50 animate-slideUp">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Görünüm
          </div>
          {options.map(({ mode, label, icon: Icon }) => {
            const isSelected = theme === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  setTheme(mode);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-colors duration-150',
                  isSelected
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

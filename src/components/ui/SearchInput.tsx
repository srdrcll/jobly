import React, { InputHTMLAttributes, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  showKbdShortcut?: boolean;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear, showKbdShortcut = true, className, placeholder = "Ara... (örn. Teknoloji A.Ş., React Developer)", ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
      <div className={cn('relative flex items-center w-full', className)}>
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-16 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-sm placeholder:text-slate-400 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all duration-200"
          {...props}
        />

        <div className="absolute right-3 flex items-center gap-1.5 pointer-events-auto">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-md text-slate-400 hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Aramayı Temizle"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}

          {showKbdShortcut && !value && (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/50 dark:border-slate-700/60 rounded-md select-none">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

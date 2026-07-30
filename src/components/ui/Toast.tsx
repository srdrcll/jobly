import React from 'react';
import { useToast } from '@/hooks/useToast';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slideUp",
              isSuccess && "bg-emerald-950/90 text-emerald-100 border-emerald-800/50 dark:bg-emerald-950/90 dark:text-emerald-200",
              isError && "bg-rose-950/90 text-rose-100 border-rose-800/50 dark:bg-rose-950/90 dark:text-rose-200",
              isWarning && "bg-amber-950/90 text-amber-100 border-amber-800/50 dark:bg-amber-950/90 dark:text-amber-200",
              isInfo && "bg-slate-900/90 text-slate-100 border-slate-700/60 dark:bg-slate-900/95 dark:text-slate-200"
            )}
          >
            <div className="shrink-0 mt-0.5" aria-hidden="true">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {isInfo && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs opacity-85 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-white transition-colors p-1 rounded-md"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

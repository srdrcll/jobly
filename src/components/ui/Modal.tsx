import React, { useEffect, useRef, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  // Always keep onCloseRef updated without re-triggering effects
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Initial focus management when modal opens (runs ONLY when isOpen transitions to true)
  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    // Set initial focus ONLY if focus is currently outside the modal container
    if (document.activeElement && !modalElement?.contains(document.activeElement)) {
      const focusableElements = modalElement?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstInput = Array.from(focusableElements || []).find((el) =>
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)
      );
      (firstInput || focusableElements?.[0])?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation & body overflow handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (e.key === 'Tab') {
        const modalElement = modalRef.current;
        const focusableElements = modalElement?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Container with Focus Trap */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-white/95 dark:bg-[#0D1322]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/80 rounded-3xl shadow-soft-dark overflow-hidden z-10 animate-slideUp text-slate-900 dark:text-slate-100 my-8 focus:outline-none specular-border',
          widthClasses[maxWidth]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 rounded-xl" aria-hidden="true">
                {icon}
              </div>
            )}
            <div>
              <h3 id="modal-title" className="text-lg font-bold tracking-tight text-slate-900 dark:white">{title}</h3>
              {description && (
                <p id="modal-description" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{description}</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Modalı Kapat"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        {children && (
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

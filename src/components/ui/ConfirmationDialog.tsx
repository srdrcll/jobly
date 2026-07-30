import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Info } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Onayla',
  cancelText = 'İptal',
  variant = 'danger',
  isLoading = false,
}) => {
  const icon = variant === 'danger' || variant === 'warning' ? (
    <AlertTriangle className={`w-5 h-5 ${variant === 'danger' ? 'text-rose-400' : 'text-amber-400'}`} aria-hidden="true" />
  ) : (
    <Info className="w-5 h-5 text-blue-400" aria-hidden="true" />
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={icon}
      maxWidth="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm text-slate-300 leading-relaxed">{message}</p>
    </Modal>
  );
};

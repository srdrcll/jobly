import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { ToastContainer } from '../Toast';
import { useToast } from '@/hooks/useToast';
import React, { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

const SuccessToastTest = () => {
  const { toast } = useToast();
  useEffect(() => {
    toast.success('Başarı Başlığı', 'Başarı açıklaması.');
  }, [toast]);
  return <ToastContainer />;
};

const ErrorToastTest = () => {
  const { toast } = useToast();
  useEffect(() => {
    toast.error('Hata Başlığı', 'Hata açıklaması.');
  }, [toast]);
  return <ToastContainer />;
};

describe('ToastContainer Component', () => {
  it('renders nothing when there are no toasts', () => {
    const { container } = render(<ToastContainer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders and dismisses success toast correctly', async () => {
    render(<SuccessToastTest />);

    expect(screen.getByText('Başarı Başlığı')).toBeInTheDocument();
    expect(screen.getByText('Başarı açıklaması.')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /kapat/i });
    await userEvent.click(closeButton);

    expect(screen.queryByText('Başarı Başlığı')).not.toBeInTheDocument();
  });

  it('renders error toast with correct styles', () => {
    const { container } = render(<ErrorToastTest />);

    expect(screen.getByText('Hata Başlığı')).toBeInTheDocument();
    expect(screen.getByText('Hata açıklaması.')).toBeInTheDocument();
    
    const toastElement = container.querySelector('.bg-rose-950\\/90');
    expect(toastElement).toBeInTheDocument();
  });
});

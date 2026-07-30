import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/Toast';

export const RootLayout: React.FC = () => {
  return (
    <ToastProvider>
      <Outlet />
      <ToastContainer />
    </ToastProvider>
  );
};

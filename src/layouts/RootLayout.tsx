import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '@/hooks/useToast';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from '@/components/ui/Toast';

export const RootLayout: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Outlet />
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  );
};

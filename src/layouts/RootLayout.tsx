import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ToastProvider } from '@/hooks/useToast';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from '@/components/ui/Toast';

export const RootLayout: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <Outlet />
          <ToastContainer />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

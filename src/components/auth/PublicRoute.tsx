import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export const PublicRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" aria-hidden="true" />
      </div>
    );
  }

  // If a valid session exists, redirect to dashboard
  if (session?.access_token && session?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

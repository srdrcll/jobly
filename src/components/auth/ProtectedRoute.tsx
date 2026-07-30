import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Compass, Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 animate-fadeIn">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-xl shadow-indigo-600/30 animate-bounce">
            <Compass className="w-8 h-8" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">Oturum Kontrol Ediliyor</h3>
            <p className="text-xs text-slate-400">Kariyer Pusulası doğrulanıyor...</p>
          </div>
          <Loader2 className="w-5 h-5 text-indigo-500 animate-spin mt-2" aria-hidden="true" />
        </div>
      </div>
    );
  }

  // Validate that a real Supabase session with access_token exists
  if (!session?.access_token || !session?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

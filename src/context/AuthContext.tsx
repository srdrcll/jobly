import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, getTurkishAuthErrorMessage } from '@/lib/supabase';
import { useToast } from '@/hooks/useToast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  demoLogin: () => void;
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'demo-user-888',
  app_metadata: { provider: 'email' },
  user_metadata: { full_name: 'Serdar Çil' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'serdar.cil@example.com',
  role: 'authenticated',
  updated_at: new Date().toISOString(),
};

const DEMO_SESSION: Session = {
  access_token: 'demo-access-token-123456',
  token_type: 'bearer',
  user: DEMO_USER,
  expires_in: 86400,
  refresh_token: 'demo-refresh-token-123456',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(() => {
    const savedDemo = localStorage.getItem('kp-demo-session');
    return savedDemo ? JSON.parse(savedDemo) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const user = session?.user ?? null;

  useEffect(() => {
    // Initial Session Restore
    const initSession = async () => {
      try {
        if (!session) {
          const { data: { session: initialSession } } = await supabase.auth.getSession();
          if (initialSession) {
            setSession(initialSession);
          }
        }
      } catch (err: unknown) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Subscribe to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession) {
        setSession(currentSession);
        localStorage.removeItem('kp-demo-session');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const demoLogin = () => {
    setSession(DEMO_SESSION);
    localStorage.setItem('kp-demo-session', JSON.stringify(DEMO_SESSION));
    toast.success('Demo Girişi Yapıldı', 'Kariyer Pusulası paneline hoş geldiniz!');
  };

  const login = async (email: string, password: string) => {
    // Handle demo account fallback
    if (email.toLowerCase().includes('demo') || password === 'demo123456' || !isSupabaseConfigured) {
      demoLogin();
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const trMessage = getTurkishAuthErrorMessage(error);
        return { success: false, error: trMessage };
      }

      setSession(data.session);
      localStorage.removeItem('kp-demo-session');
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getTurkishAuthErrorMessage(err) };
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      demoLogin();
      return { success: true, requiresVerification: false };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        const trMessage = getTurkishAuthErrorMessage(error);
        return { success: false, error: trMessage };
      }

      const requiresVerification = !data.session;
      if (data.session) {
        setSession(data.session);
      }

      return { success: true, requiresVerification };
    } catch (err: unknown) {
      return { success: false, error: getTurkishAuthErrorMessage(err) };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('kp-demo-session');
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      setSession(null);
      toast.info('Oturum Kapatıldı', 'Güvenli bir şekilde çıkış yaptınız.');
    } catch (err: unknown) {
      console.error('Logout error:', err);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        return { success: false, error: getTurkishAuthErrorMessage(error) };
      }

      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getTurkishAuthErrorMessage(err) };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: getTurkishAuthErrorMessage(error) };
      }

      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getTurkishAuthErrorMessage(err) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        login,
        demoLogin,
        register,
        logout,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

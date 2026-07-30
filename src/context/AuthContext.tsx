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
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const user = session?.user ?? null;

  useEffect(() => {
    // Initial Session Restore
    const initSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
      } catch (err: unknown) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Subscribe to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
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
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getTurkishAuthErrorMessage(err) };
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
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
      await supabase.auth.signOut();
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

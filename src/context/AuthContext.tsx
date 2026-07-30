import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase, getTurkishAuthErrorMessage } from '@/lib/supabase';
import { useToast } from '@/hooks/useToast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
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

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Initial Session Restore — validates with Supabase server
    const initSession = async () => {
      try {
        const { data: { session: serverSession }, error } = await supabase.auth.getSession();
        if (isMounted) {
          if (error || !serverSession) {
            clearSession();
          } else {
            setSession(serverSession);
          }
        }
      } catch (err: unknown) {
        console.error('Auth init error:', err);
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initSession();

    // Subscribe to Auth State Changes from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        if (!isMounted) return;

        switch (event) {
          case 'SIGNED_IN':
          case 'TOKEN_REFRESHED':
            setSession(currentSession);
            break;
          case 'SIGNED_OUT':
            clearSession();
            break;
          default:
            setSession(currentSession);
            break;
        }
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [clearSession]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const trMessage = getTurkishAuthErrorMessage(error);
        return { success: false, error: trMessage };
      }

      if (!data.session) {
        return { success: false, error: 'Oturum oluşturulamadı. Lütfen tekrar deneyin.' };
      }

      setSession(data.session);
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: getTurkishAuthErrorMessage(err) };
    }
  };

  const register = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string; requiresVerification?: boolean }> => {
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
      clearSession();
      toast.info('Oturum Kapatıldı', 'Güvenli bir şekilde çıkış yaptınız.');
    } catch (err: unknown) {
      console.error('Logout error:', err);
      clearSession();
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

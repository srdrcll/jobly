import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      toast.error('Giriş Başarısız', res.error || 'E-posta veya şifrenizi kontrol edin.');
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xl space-y-6">
      <div className="text-center space-y-1.5">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-2" aria-hidden="true">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">Hoş Geldiniz</h2>
        <p className="text-xs text-slate-400">Kariyer Pusulası hesabınıza giriş yapın</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-Posta Adresi"
          type="email"
          required
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@domain.com"
          leftIcon={<Mail className="w-4 h-4" aria-hidden="true" />}
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-300">Şifre</label>
            <Link to="/forgot-password" className="text-[11px] text-indigo-400 hover:underline">
              Şifremi Unuttum?
            </Link>
          </div>
          <Input
            type="password"
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" aria-hidden="true" />}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
        >
          Giriş Yap
        </Button>
      </form>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-400">
        Hesabınız yok mu?{' '}
        <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
          Ücretsiz Kayıt Olun
        </Link>
      </div>
    </div>
  );
};

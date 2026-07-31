import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await resetPassword(email);
    setIsLoading(false);

    if (res.success) {
      setIsSubmitted(true);
      toast.success('Sıfırlama Bağlantısı Gönderildi', 'E-posta adresinize şifre sıfırlama bağlantısı gönderildi.');
    } else {
      toast.error('İşlem Başarısız', res.error || 'Şifre sıfırlama e-postası gönderilemedi.');
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xl space-y-6">
      <div className="text-center space-y-1.5">
        <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-2" aria-hidden="true">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">Şifrenizi mi Unuttunuz?</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" aria-hidden="true" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-300">Bağlantı Gönderildi!</h4>
            <p className="text-xs text-slate-300">
              <span className="font-semibold text-white">{email}</span> adresine sıfırlama talimatları iletildi.
            </p>
          </div>
          <Link to="/login" className="inline-block pt-2">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" aria-hidden="true" />}>
              Giriş Sayfasına Dön
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-Posta Adresi"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@domain.com"
            leftIcon={<Mail className="w-4 h-4" aria-hidden="true" />}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
          >
            Sıfırlama Bağlantısı Gönder
          </Button>
        </form>
      )}

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-400">
        Hatırladınız mı?{' '}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
          Giriş Yapın
        </Link>
      </div>
    </div>
  );
};

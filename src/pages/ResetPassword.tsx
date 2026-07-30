import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Şifreler Eşleşmiyor', 'Girdiğiniz şifreler birbiriyle aynı olmalıdır.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Geçersiz Şifre', 'Şifreniz en az 6 karakterden oluşmalıdır.');
      return;
    }

    setIsLoading(true);
    const res = await updatePassword(newPassword);
    setIsLoading(false);

    if (res.success) {
      toast.success('Şifre Güncellendi', 'Yeni şifreniz başarıyla kaydedildi. Giriş yapabilirsiniz.');
      navigate('/dashboard');
    } else {
      toast.error('Şifre Güncellenemedi', res.error || 'Şifre güncellenirken bir sorun oluştu.');
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xl space-y-6">
      <div className="text-center space-y-1.5">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-2" aria-hidden="true">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">Yeni Şifre Belirleyin</h2>
        <p className="text-xs text-slate-400">Hesabınız için güvenli yeni bir şifre girin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Yeni Şifre"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="En az 6 karakter"
          leftIcon={<Lock className="w-4 h-4" aria-hidden="true" />}
        />

        <Input
          label="Yeni Şifre (Tekrar)"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" aria-hidden="true" />}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
        >
          Şifreyi Güncelle
        </Button>
      </form>
    </div>
  );
};

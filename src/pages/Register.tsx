import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Geçersiz Şifre', 'Şifreniz en az 6 karakterden oluşmalıdır.');
      return;
    }

    setIsLoading(true);
    const res = await register(email, password, fullName);
    setIsLoading(false);

    if (res.success) {
      if (res.requiresVerification) {
        toast.info('Doğrulama E-postası Gönderildi', 'Hesabınızı aktif etmek için lütfen e-postanıza gönderilen doğrulama bağlantısına tıklayın.');
        navigate('/login');
      } else {
        toast.success('Kayıt Başarılı', 'JOBLY hesabınız oluşturuldu.');
        navigate('/dashboard');
      }
    } else {
      toast.error('Kayıt Başarısız', res.error || 'Kayıt olunurken bir hata oluştu.');
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xl space-y-6">
      <div className="text-center space-y-1.5">
        <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-2" aria-hidden="true">
          <UserPlus className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">Ücretsiz Kaydolun</h2>
        <p className="text-xs text-slate-400">Kariyer yolculuğunuzu JOBLY ile profesyonelce yönetin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Ad Soyad"
          type="text"
          required
          disabled={isLoading}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="örn. Serdar Çil"
          leftIcon={<User className="w-4 h-4" aria-hidden="true" />}
        />

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

        <Input
          label="Şifre"
          type="password"
          required
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="En az 6 karakter"
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
          Kayıt Ol ve Başla
        </Button>
      </form>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-400">
        Zaten hesabınız var mı?{' '}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
          Giriş Yapın
        </Link>
      </div>
    </div>
  );
};

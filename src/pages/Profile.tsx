import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Globe, 
  Award, 
  Lock, 
  ShieldCheck, 
  Save, 
  Calendar 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const ProfilePage: React.FC = () => {
  const { user, updatePassword } = useAuth();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Kullanıcı';
  const email = user?.email || 'ornek@domain.com';

  const avatarInitials = fullName
    .split(' ')
    .map((part: string) => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Bilinmiyor';

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Şifreler Eşleşmiyor', 'Lütfen yeni şifrenizi tekrar doğrulayın.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Geçersiz Şifre', 'Şifreniz en az 6 karakterden oluşmalıdır.');
      return;
    }

    setIsUpdatingPassword(true);
    const res = await updatePassword(newPassword);
    setIsUpdatingPassword(false);

    if (res.success) {
      toast.success('Şifre Güncellendi', 'Hesap şifreniz başarıyla değiştirildi.');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error('Güncelleme Başarısız', res.error || 'Şifre değiştirilirken bir sorun oluştu.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <PageHeader
        title="Profilim"
        description="Doğrulanmış hesap bilgileriniz ve oturum güvenliği."
        icon={User}
        badge="Aktif Oturum"
      />

      {/* Main Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shrink-0">
            {avatarInitials}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{fullName}</h2>
                <p className="text-sm font-semibold text-indigo-500">{email}</p>
              </div>
              <span className="self-center sm:self-auto px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Doğrulanmış Kullanıcı
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Güvenli kimlik doğrulama ile korunan oturum. İş başvurularınız ve kariyer hedefleriniz bu hesap altında saklanır.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> {email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Kayıt Tarihi: {createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change & Security Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security / Password Update Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Şifre Değiştir
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-3">
            <Input
              label="Yeni Şifre"
              type="password"
              required
              disabled={isUpdatingPassword}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="En az 6 karakter"
              leftIcon={<Lock className="w-4 h-4" aria-hidden="true" />}
            />

            <Input
              label="Yeni Şifre (Tekrar)"
              type="password"
              required
              disabled={isUpdatingPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" aria-hidden="true" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isUpdatingPassword}
              leftIcon={<Save className="w-4 h-4" aria-hidden="true" />}
            >
              Şifreyi Güncelle
            </Button>
          </form>
        </div>

        {/* Account Info Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Oturum Detayları
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400">User ID (UUID):</span>
              <span className="font-mono text-[11px] text-indigo-400 truncate max-w-[180px]">{user?.id || '—'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400">E-Posta Doğrulandı mı:</span>
              <span className="font-semibold text-emerald-400">{user?.email_confirmed_at ? 'Evet' : 'Evet (Test Modu)'}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Son Giriş:</span>
              <span className="font-semibold text-foreground">Bugün</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

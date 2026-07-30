import React from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Globe, 
  Award, 
  Edit3 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

export const ProfilePage: React.FC = () => {
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast.success('Profil Güncellendi', 'Kariyer profil değişiklikleriniz kaydedildi.');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <PageHeader
        title="Profilim"
        description="Kişisel özgeçmiş detaylarınız, yetenekleriniz ve kariyer hedefleriniz."
        icon={User}
        badge="Pro Üye"
        actionSlot={
          <Button variant="primary" size="sm" leftIcon={<Edit3 className="w-4 h-4" aria-hidden="true" />} onClick={handleSaveProfile}>
            Profili Düzenle
          </Button>
        }
      />

      {/* Main Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shrink-0">
            SÇ
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">Serdar Çil</h2>
                <p className="text-sm font-semibold text-indigo-500">Senior Full Stack Engineer & UI/UX Designer</p>
              </div>
              <span className="self-center sm:self-auto px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" /> İş Fırsatlarına Açık
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              8+ yıllık modern web mimarisi, React, TypeScript, Next.js ve TailwindCSS deneyimine sahip full stack mühendis. Yüksek performanslı SaaS platformları tasarlamada uzman.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> İstanbul, Türkiye
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> serdar.cil@example.com
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> serdarcil.dev
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills & Stack */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft">
          <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Yetenekler & Teknolojiler
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'React 18',
              'TypeScript',
              'Next.js',
              'TailwindCSS',
              'Node.js',
              'GraphQL',
              'Vite',
              'System Design',
              'UI/UX Architecture',
              'Jest / RTL',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Career Preferences */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft">
          <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Kariyer Tercihleri
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400">Hedef Pozisyon:</span>
              <span className="font-semibold text-foreground">Lead / Staff Frontend Engineer</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400">Çalışma Tipi:</span>
              <span className="font-semibold text-foreground">Remote veya Hybrid</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Maaş Beklentisi:</span>
              <span className="font-semibold text-emerald-400">95,000 TRY+ / Ay veya $90k+ USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Save, 
  Globe, 
  Download,
  CheckCircle2
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { applicationsRepository } from '@/repositories/applicationsRepository';
import { interviewsRepository } from '@/repositories/interviewsRepository';
import { companiesRepository } from '@/repositories/companiesRepository';

const SETTINGS_KEY = 'kp_user_settings_v1';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'notifications' | 'security'>('general');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [currency, setCurrency] = useState('TRY');
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.emailAlerts === 'boolean') setEmailAlerts(parsed.emailAlerts);
        if (typeof parsed.interviewReminders === 'boolean') setInterviewReminders(parsed.interviewReminders);
        if (parsed.currency) setCurrency(parsed.currency);
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    try {
      const settingsPayload = {
        emailAlerts,
        interviewReminders,
        currency,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsPayload));
      setIsSaving(false);
      toast.success('Ayarlar Kaydedildi', 'Uygulama tercihleriniz başarıyla güncellendi ve kaydedildi.');
    } catch {
      setIsSaving(false);
      toast.error('Kayıt Başarısız', 'Ayarlar kaydedilirken bir sorun oluştu.');
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const apps = await applicationsRepository.getAll();
      const interviews = await interviewsRepository.getAll();
      const companies = await companiesRepository.getAll();

      const exportPayload = {
        exportDate: new Date().toISOString(),
        applications: apps,
        interviews: interviews,
        companies: companies,
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `kariyer_pusulasi_yedek_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setIsExporting(false);
      toast.success('Dışa Aktarma Başarılı', 'Tüm başvuru, şirket ve mülakat verileriniz JSON dosyası olarak indirildi.');
    } catch {
      setIsExporting(false);
      toast.error('Dışa Aktarma Başarısız', 'Veriler dışa aktarılırken sorun oluştu.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <PageHeader
        title="Ayarlar"
        description="Uygulama görünümü, bildirim tercihleri ve hesap ayarlarınızı özelleştirin."
        icon={Settings}
        actionSlot={
          <Button
            variant="primary"
            size="sm"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" aria-hidden="true" />}
            onClick={handleSave}
          >
            Değişiklikleri Kaydet
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs Side Menu */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveSection('general')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeSection === 'general'
                ? 'bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20'
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" aria-hidden="true" /> Genel Tercihler
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeSection === 'notifications'
                ? 'bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20'
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" aria-hidden="true" /> Bildirimler
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeSection === 'security'
                ? 'bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20'
                : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" aria-hidden="true" /> Güvenlik & Veri
          </button>
        </div>

        {/* Content Box */}
        <div className="md:col-span-3 bg-white/80 dark:bg-[#162238]/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/70 rounded-3xl p-6 shadow-soft dark:shadow-soft-dark space-y-6 specular-border">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-foreground border-b border-slate-100 dark:border-slate-800/60 pb-3">
                Bölgesel Tercihler
              </h3>

              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <label htmlFor="currency-select" className="block text-xs font-semibold text-slate-300">
                  Varsayılan Para Birimi
                </label>
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-foreground focus:outline-none"
                >
                  <option value="TRY">TRY (₺) Türk Lirası</option>
                  <option value="USD">USD ($) Amerikan Doları</option>
                  <option value="EUR">EUR (€) Euro</option>
                  <option value="GBP">GBP (£) İngiliz Sterlini</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-foreground border-b border-slate-100 dark:border-slate-800/60 pb-3">
                Bildirim Ayarları
              </h3>

              <div className="flex items-center justify-between">
                <label htmlFor="interview-reminders-checkbox" className="cursor-pointer">
                  <h4 className="text-sm font-semibold text-foreground">Mülakat Hatırlatmaları</h4>
                  <p className="text-xs text-slate-400">Yaklaşan mülakatlar için 24 saat öncesinde bildirim al.</p>
                </label>
                <input
                  id="interview-reminders-checkbox"
                  type="checkbox"
                  checked={interviewReminders}
                  onChange={(e) => setInterviewReminders(e.target.checked)}
                  aria-label="Mülakat Hatırlatmaları"
                  className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-800 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <label htmlFor="email-alerts-checkbox" className="cursor-pointer">
                  <h4 className="text-sm font-semibold text-foreground">Haftalık Kariyer Raporu</h4>
                  <p className="text-xs text-slate-400">Haftalık başvuru özetinizi e-posta ile alın.</p>
                </label>
                <input
                  id="email-alerts-checkbox"
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  aria-label="Haftalık Kariyer Raporu"
                  className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-800 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-foreground border-b border-slate-100 dark:border-slate-800/60 pb-3">
                Veri Dışa Aktarma
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Tüm Verileri İndir (JSON)</h4>
                  <p className="text-xs text-slate-400">Tüm başvuru, şirket ve mülakat kayıtlarınızı JSON dosyası olarak yedekleyin.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  isLoading={isExporting}
                  onClick={handleExportData}
                  leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}
                >
                  Dışa Aktar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

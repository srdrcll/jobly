import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Globe, 
  Building2, 
  Send,
  Briefcase
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { getPlatformStyle } from '@/utils/platformUtils';
import { getCompanyLogoUrl } from '@/utils/jobUrlParser';
import { 
  generateCoverLetter, 
  CoverLetterTone, 
  CoverLetterLanguage 
} from '@/utils/aiGenerator';

interface GenerateCoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: {
    company_name: string;
    position: string;
    contact_name?: string | null;
    contact_email?: string | null;
    location?: string | null;
    source?: string | null;
  } | null;
}

export const GenerateCoverLetterModal: React.FC<GenerateCoverLetterModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const { toast } = useToast();
  const [tone, setTone] = useState<CoverLetterTone>('professional');
  const [language, setLanguage] = useState<CoverLetterLanguage>('tr');
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const [generated, setGenerated] = useState<{ subject: string; body: string }>({ subject: '', body: '' });

  useEffect(() => {
    if (isOpen && application) {
      const res = generateCoverLetter({
        companyName: application.company_name,
        position: application.position,
        contactName: application.contact_name,
        location: application.location,
        tone,
        language,
      });
      setGenerated(res);
    }
  }, [isOpen, application, tone, language]);

  if (!application) return null;

  const companyLogoUrl = getCompanyLogoUrl(application.company_name);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const res = generateCoverLetter({
        companyName: application.company_name,
        position: application.position,
        contactName: application.contact_name,
        location: application.location,
        tone,
        language,
      });
      setGenerated(res);
      setIsRegenerating(false);
      toast.info('Metin Yenilendi', 'Yapay zeka ön mektup taslağını yeniden oluşturdu.');
    }, 300);
  };

  const handleCopyAll = () => {
    const fullText = `Konu: ${generated.subject}\n\n${generated.body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    toast.success('Kopyalandı!', 'Tüm e-posta taslağı panoya kopyalandı.');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(generated.body);
    setCopiedBody(true);
    toast.success('Mektup Metni Kopyalandı', 'Ön mektup gövdesi panoya kopyalandı.');
    setTimeout(() => setCopiedBody(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-blue-500">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span>Yapay Zeka Ön Mektup & E-posta Üreticisi</span>
        </div>
      }
      description={`${application.company_name} - ${application.position} başvurusu için kişiselleştirilmiş kapak mektubu ve soğuk e-posta taslağı.`}
      maxWidth="2xl"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            leftIcon={<RefreshCw className={`w-4 h-4 text-blue-500 ${isRegenerating ? 'animate-spin' : ''}`} />}
          >
            Yeniden Üret
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopyBody}
              leftIcon={copiedBody ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            >
              Yalnızca Gövdeyi Kopyala
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleCopyAll}
              leftIcon={copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4" />}
            >
              {copiedAll ? 'Kopyalandı!' : 'Tümünü Kopyala (Konu + Metin)'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Company & Position Info Header */}
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-blue-500 font-bold text-sm shrink-0 overflow-hidden relative shadow-sm">
              {companyLogoUrl ? (
                <img
                  src={companyLogoUrl}
                  alt={application.company_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              <span>{application.company_name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h4 className="font-black text-sm text-foreground">{application.company_name}</h4>
              <p className="text-xs text-blue-500 font-semibold">{application.position}</p>
            </div>
          </div>

          {application.source && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${getPlatformStyle(application.source)?.bg} ${getPlatformStyle(application.source)?.text} ${getPlatformStyle(application.source)?.border}`}>
              <Globe className="w-3 h-3 text-blue-500" />
              {getPlatformStyle(application.source)?.label}
            </span>
          )}
        </div>

        {/* Tone & Language Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tone Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-400">Üslup / İletişim Tarzı</label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setTone('professional')}
                className={`py-1.5 px-2 rounded-lg font-semibold transition-all ${tone === 'professional' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-foreground'}`}
              >
                💼 Kurumsal
              </button>
              <button
                type="button"
                onClick={() => setTone('cold_email')}
                className={`py-1.5 px-2 rounded-lg font-semibold transition-all ${tone === 'cold_email' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-foreground'}`}
              >
                ⚡ Kısa & Etkili
              </button>
              <button
                type="button"
                onClick={() => setTone('casual')}
                className={`py-1.5 px-2 rounded-lg font-semibold transition-all ${tone === 'casual' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-foreground'}`}
              >
                🚀 Samimi
              </button>
              <button
                type="button"
                onClick={() => setTone('technical')}
                className={`py-1.5 px-2 rounded-lg font-semibold transition-all ${tone === 'technical' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-foreground'}`}
              >
                🛠️ Teknik
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-400">Dil Seçimi</label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs h-[42px] items-center">
              <button
                type="button"
                onClick={() => setLanguage('tr')}
                className={`py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${language === 'tr' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-foreground'}`}
              >
                🇹🇷 Türkçe
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${language === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-foreground'}`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>

        {/* Generated Subject Line */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-400">E-posta Konu Başlığı (Subject)</label>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generated.subject);
                setCopiedSubject(true);
                toast.success('Konu Kopyalandı', 'Konu başlığı panoya kopyalandı.');
                setTimeout(() => setCopiedSubject(false), 2000);
              }}
              className="text-[11px] text-blue-500 font-semibold hover:underline flex items-center gap-1"
            >
              {copiedSubject ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              Konuyu Kopyala
            </button>
          </div>
          <input
            type="text"
            readOnly
            value={generated.subject}
            className="w-full h-10 px-3.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-semibold text-foreground"
          />
        </div>

        {/* Generated Body Area */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-400">Ön Mektup / E-posta Gövdesi (Body)</label>
          <textarea
            rows={10}
            value={generated.body}
            onChange={(e) => setGenerated((prev) => ({ ...prev, body: e.target.value }))}
            className="w-full p-3.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-foreground leading-relaxed font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>
    </Modal>
  );
};

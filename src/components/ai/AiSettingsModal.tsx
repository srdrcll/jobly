import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAiSettingsQuery, useUpdateAiSettingsMutation } from '@/hooks/queries/useAiQuery';
import { AiSettings } from '@/types/ai';
import { Cpu, UserCheck, Sliders } from 'lucide-react';

interface AiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiSettingsModal: React.FC<AiSettingsModalProps> = ({ isOpen, onClose }) => {
  const { data: currentSettings } = useAiSettingsQuery();
  const updateMutation = useUpdateAiSettingsMutation();

  const [settings, setSettings] = useState<AiSettings>({
    model: 'gemini-1.5-pro',
    persona: 'Career Coach',
    creativity: 0.7,
    responseLength: 'balanced',
  });

  useEffect(() => {
    if (currentSettings) setSettings(currentSettings);
  }, [currentSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(settings, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yapay Zekâ Model Tercihleri"
      description="Kariyer Asistanınızın model, persona ve yanıt derinliği ayarları."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-2">
        {/* Model Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-blue-500" /> Model Seçimi
          </label>
          <select
            value={settings.model}
            onChange={(e) => setSettings({ ...settings, model: e.target.value as any })}
            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-foreground focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="gemini-1.5-pro">✨ Gemini 1.5 Pro (Derin Akıl Yürütme)</option>
            <option value="gemini-1.5-flash">⚡ Gemini 1.5 Flash (Ultra Hızlı)</option>
            <option value="claude-3.5-sonnet">🧠 Claude 3.5 Sonnet (Doğal İletişim)</option>
            <option value="gpt-4o">🤖 GPT-4o (Genel Zekâ)</option>
          </select>
        </div>

        {/* Persona Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-500" /> Yapay Zekâ Personası / Rolü
          </label>
          <select
            value={settings.persona}
            onChange={(e) => setSettings({ ...settings, persona: e.target.value as any })}
            className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-foreground focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Career Coach">🧭 Kıdemli Kariyer Koçu & Rehber</option>
            <option value="HR Manager">👔 İK Direktörü & İşe Alım Yöneticisi</option>
            <option value="Tech Lead">💻 Senior Software Architect & Tech Lead</option>
            <option value="Executive Recruiter">🏆 Üst Düzey Yönetici Avcısı (Headhunter)</option>
          </select>
        </div>

        {/* Creativity Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-foreground flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" /> Yaratıcılık Seviyesi (Temperature)
            </span>
            <span className="text-blue-500 font-extrabold">{settings.creativity}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={settings.creativity}
            onChange={(e) => setSettings({ ...settings, creativity: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Daha Odaklı & Dürüst</span>
            <span>Daha Yaratıcı</span>
          </div>
        </div>

        {/* Response Length */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Yanıt Derinliği</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'concise', label: 'Özet' },
              { id: 'balanced', label: 'Dengeli' },
              { id: 'detailed', label: 'Detaylı' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSettings({ ...settings, responseLength: item.id as any })}
                className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                  settings.responseLength === item.id
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={updateMutation.isPending}>
            Ayarları Kaydet
          </Button>
        </div>
      </form>
    </Modal>
  );
};

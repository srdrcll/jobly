import React, { useState } from 'react';
import { 
  MessageSquare, 
  Linkedin, 
  Mail, 
  Phone, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Send 
} from 'lucide-react';
import { 
  CompanyInteraction, 
  InteractionType, 
  getCompanyInteractions, 
  saveCompanyInteraction 
} from '@/utils/companyCrmUtils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface CompanyCrmInteractionsProps {
  companyId: string;
}

export const CompanyCrmInteractions: React.FC<CompanyCrmInteractionsProps> = ({ companyId }) => {
  const [interactions, setInteractions] = useState<CompanyInteraction[]>(() =>
    getCompanyInteractions(companyId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [contactName, setContactName] = useState('');
  const [type, setType] = useState<InteractionType>('linkedin');
  const [description, setDescription] = useState('');
  const [outcome, setOutcome] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newInt = saveCompanyInteraction({
      companyId,
      contactName: contactName || undefined,
      type,
      date: new Date().toISOString(),
      description,
      outcome: outcome || undefined,
      nextFollowUpDate: nextFollowUpDate || undefined,
    });

    setInteractions([newInt, ...interactions]);
    setContactName('');
    setDescription('');
    setOutcome('');
    setNextFollowUpDate('');
    setIsModalOpen(false);
  };

  const getInteractionIcon = (t: InteractionType) => {
    switch (t) {
      case 'linkedin':
        return { icon: Linkedin, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', label: 'LinkedIn Bağlantısı' };
      case 'email':
        return { icon: Mail, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', label: 'E-Posta Gönderildi' };
      case 'phone':
        return { icon: Phone, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', label: 'Telefon Görüşmesi' };
      case 'interview':
        return { icon: Calendar, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', label: 'Mülakat / Randevu' };
      case 'followup':
        return { icon: Clock, color: 'bg-teal-500/10 text-teal-400 border-teal-500/20', label: 'Takip Notu' };
      case 'meeting':
        return { icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Toplantı' };
      case 'recruiter_msg':
      default:
        return { icon: Send, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', label: 'İK Mesajı' };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Etkileşim Geçmişi (CRM Log)</h3>
            <p className="text-xs text-slate-400">Mesajlaşma, e-posta, telefon ve takip geçmişiniz</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setIsModalOpen(true)}
        >
          Etkileşim Ekle
        </Button>
      </div>

      {/* Interactions Feed */}
      {interactions.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400">Henüz Etkileşim Kaydı Yok</p>
          <p className="text-[11px] text-slate-500">İlk mesajlaşma veya telefon görüşmenizi kaydedin.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {interactions.map((item) => {
            const config = getInteractionIcon(item.type);
            const Icon = config.icon;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`p-1.5 rounded-lg border ${config.color} shrink-0`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-foreground truncate">{config.label}</span>
                    {item.contactName && (
                      <span className="text-[11px] text-indigo-400 font-semibold truncate">
                        • {item.contactName}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {new Date(item.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-7">{item.description}</p>

                {item.outcome && (
                  <div className="pl-7 pt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Sonuç: {item.outcome}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Etkileşim Kaydı"
        description="Şirket veya İK yetkilisi ile yapılan görüşmeyi kaydedin."
        size="md"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Görüşülen İK / Temsilci Kişi"
            placeholder="Örn: Ayşe Yılmaz (Talent Partner)"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Etkileşim Türü</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as InteractionType)}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="linkedin">🔗 LinkedIn Bağlantısı & Mesaj</option>
              <option value="email">📧 E-Posta Gönderildi / Alındı</option>
              <option value="phone">📞 Telefon Görüşmesi</option>
              <option value="recruiter_msg">💬 İK Doğrudan Mesajı</option>
              <option value="interview">👥 Mülakat / Görüşme</option>
              <option value="followup">⏰ Takip Mesajı</option>
              <option value="meeting">🤝 Toplantı</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Açıklama & Detaylar *</label>
            <textarea
              rows={3}
              required
              placeholder="Görüşülen konular, cv iletimi, maaş beklentisi konuşmaları..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <Input
            label="Görüşme Sonucu (Opsiyonel)"
            placeholder="Örn: Mülakat tarihi haftaya ertelendi"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />

          <Input
            label="Sonraki Takip Tarihi"
            type="date"
            value={nextFollowUpDate}
            onChange={(e) => setNextFollowUpDate(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Etkileşimi Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

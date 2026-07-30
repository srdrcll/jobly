import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  Plus, 
  Copy, 
  Download, 
  Check 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { DocumentTemplate } from '@/types';

const MOCK_TEMPLATES: DocumentTemplate[] = [
  {
    id: 't-1',
    title: 'Senior Frontend Engineer Özgeçmiş Şablonu',
    category: 'CV / Özgeçmiş',
    description: 'ATS uyumlu, React & TypeScript odaklı, etki bazlı başarı metrikleri içeren modern CV taslağı.',
    usageCount: 420,
    updatedAt: 'Temmuz 2026',
    tags: ['ATS Friendly', 'React', 'TypeScript', 'Impact-driven'],
  },
  {
    id: 't-2',
    title: 'Şirkete Özel İkna Edici Ön Mektup (Cover Letter)',
    category: 'Ön Mektup',
    description: 'Şirketin ürün vizyonunu ve sunduğunuz katma değeri doğrudan vurgulayan kısa ve vurucu kapak mektubu.',
    usageCount: 280,
    updatedAt: 'Haziran 2026',
    tags: ['Personalized', 'Concise', 'High-Response'],
  },
  {
    id: 't-3',
    title: 'LinkedIn Üzerinden Mühendise Direkt Outreach E-postası',
    category: 'E-posta',
    description: 'Engineering Manager veya İK liderlerine direkt mesaj gönderirken kullanılan %45 geri dönüşlü soğuk mesaj.',
    usageCount: 650,
    updatedAt: 'Temmuz 2026',
    tags: ['Networking', 'Cold Outreach', 'LinkedIn'],
  },
  {
    id: 't-4',
    title: 'System Design Mülakat Hazırlık ve Not Şablonu',
    category: 'Mülakat Takip',
    description: 'Mülakat öncesi sistem mimarisi, trade-off tartışmaları ve canlı kodlama hazırlık kontrol listesi.',
    usageCount: 190,
    updatedAt: 'Temmuz 2026',
    tags: ['System Design', 'Interview Notes', 'Checklist'],
  },
];

export const TemplatesPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (id: string, title: string) => {
    setCopiedId(id);
    toast.success('Şablon Kopyalandı', `"${title}" şablonu panoya kopyalandı.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        title="Şablonlar Library"
        description="Başvurularınızda kullanabileceğiniz özgeçmiş, ön mektup ve mülakat not şablonları."
        icon={LayoutTemplate}
        badge="Şablon Kütüphanesi"
        actionSlot={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}>
            Yeni Şablon Oluştur
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_TEMPLATES.map((tmpl) => {
          const isCopied = copiedId === tmpl.id;
          return (
            <div
              key={tmpl.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {tmpl.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {tmpl.usageCount} kez kullanıldı
                  </span>
                </div>

                <h4 className="text-base font-bold text-foreground mb-2 leading-snug">
                  {tmpl.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {tmpl.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tmpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Güncelleme: {tmpl.updatedAt}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                    onClick={() => handleCopy(tmpl.id, tmpl.title)}
                  >
                    {isCopied ? 'Kopyalandı' : 'Kopyala'}
                  </Button>
                  <Button variant="secondary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}>
                    İndir
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { FileText, Upload, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CompanyProfileAttachmentsProps {
  companyName: string;
}

export const CompanyProfileAttachments: React.FC<CompanyProfileAttachmentsProps> = ({ companyName }) => {
  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Dokümanlar & Dosyalar (Attachments)</h3>
            <p className="text-xs text-slate-400">{companyName} için özel iş tanımları, teklif mektupları ve PDF'ler</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Upload className="w-3.5 h-3.5" />}
          onClick={() => alert('Doküman yükleme altyapısı aktiftir. Sprint 8.0 Document Center ile tam senkronize çalışır.')}
        >
          Dosya Yükle
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Placeholder Attachment 1 */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Şirket Teknik Şartnamesi.pdf</h4>
              <p className="text-[10px] text-slate-400">2.4 MB • PDF Dokümanı</p>
            </div>
          </div>
          <button className="p-1 text-slate-400 hover:text-indigo-400 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Placeholder Attachment 2 */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">İş Teklifi & Yan Haklar.pdf</h4>
              <p className="text-[10px] text-slate-400">1.8 MB • PDF Dokümanı</p>
            </div>
          </div>
          <button className="p-1 text-slate-400 hover:text-emerald-400 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

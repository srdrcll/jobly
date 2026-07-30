import React from 'react';
import { DbInterview } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { InterviewStatusBadge } from './InterviewStatusBadge';
import { Button } from '@/components/ui/Button';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  User, 
  ExternalLink, 
  FileText, 
  Edit3, 
  Trash2,
  FileCode
} from 'lucide-react';

interface InterviewDetailModalProps {
  interview: DbInterview | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (interview: DbInterview) => void;
  onDelete: (id: string) => void;
}

export const InterviewDetailModal: React.FC<InterviewDetailModalProps> = ({
  interview,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!interview) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${interview.company_name} — ${interview.position}`}
      description={`${interview.stage || 'Mülakat'} Detay Profili ve Notları`}
      size="lg"
    >
      <div className="space-y-6 pt-2">
        {/* Header Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-black text-xl flex items-center justify-center shrink-0">
              {interview.company_name.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-foreground">{interview.position}</h3>
              <p className="text-xs text-indigo-400 font-semibold">{interview.company_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <InterviewStatusBadge result={interview.result} />
          </div>
        </div>

        {/* Date, Time & Meeting Link Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Tarih & Saat</span>
              <p className="text-xs font-bold text-foreground">
                {new Date(interview.date).toLocaleDateString('tr-TR')} — {interview.time || '14:00'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Tahmini Süre</span>
              <p className="text-xs font-bold text-foreground">{interview.duration_minutes || 45} Dakika</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 flex items-center gap-2.5">
            <Video className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Görüşme Türü</span>
              <p className="text-xs font-bold text-foreground">{interview.type || 'Online'}</p>
            </div>
          </div>
        </div>

        {/* Online Meeting Join CTA Button */}
        {interview.meeting_link && (
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-400" />
              <div className="text-xs">
                <p className="font-bold text-indigo-200">Online Toplantı Bağlantısı Hazır</p>
                <p className="text-slate-400 truncate max-w-xs">{interview.meeting_link}</p>
              </div>
            </div>
            <a
              href={interview.meeting_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              Toplantıya Katıl <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Interviewer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Mülakatçı Kişi</span>
            <p className="font-bold text-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              {interview.interviewer_name || 'Belirtilmedi'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Mülakatçı Unvanı</span>
            <p className="font-bold text-foreground">
              {interview.interviewer_role || 'Belirtilmedi'}
            </p>
          </div>
        </div>

        {/* Preparation Notes */}
        {interview.prep_notes && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Mülakat Öncesi Hazırlık Notları</h4>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {interview.prep_notes}
            </div>
          </div>
        )}

        {/* Post Interview Notes */}
        {interview.interview_notes && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Görüşme Sonrası Değerlendirme & Sorular</h4>
            <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {interview.interview_notes}
            </div>
          </div>
        )}

        {/* Attachments Section Infrastructure */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ekler & Dokümanlar</h4>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span className="font-medium text-slate-300">Vaka Sunumu & Sunum Slaytı.pdf</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">1.4 MB</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={() => onDelete(interview.id)}
          >
            Mülakatı Sil
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Kapat
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              onClick={() => {
                onClose();
                onEdit(interview);
              }}
            >
              Düzenle
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

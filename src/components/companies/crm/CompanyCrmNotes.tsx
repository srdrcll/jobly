import React, { useState } from 'react';
import { StickyNote, Pin, Plus, Trash2, Search } from 'lucide-react';
import { 
  CompanyNoteItem, 
  getCompanyNotes, 
  saveCompanyNote, 
  toggleNotePin, 
  deleteCompanyNote 
} from '@/utils/companyCrmUtils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface CompanyCrmNotesProps {
  companyId: string;
}

export const CompanyCrmNotes: React.FC<CompanyCrmNotesProps> = ({ companyId }) => {
  const [notes, setNotes] = useState<CompanyNoteItem[]>(() => getCompanyNotes(companyId));
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    saveCompanyNote({
      companyId,
      title,
      content,
      isPinned,
    });

    setNotes(getCompanyNotes(companyId));
    setTitle('');
    setContent('');
    setIsPinned(false);
    setIsModalOpen(false);
  };

  const handleTogglePin = (id: string) => {
    toggleNotePin(id);
    setNotes(getCompanyNotes(companyId));
  };

  const handleDelete = (id: string) => {
    deleteCompanyNote(id);
    setNotes(getCompanyNotes(companyId));
  };

  const filteredNotes = notes.filter((n) => {
    const q = search.toLowerCase().trim();
    return !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <StickyNote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Özel Şirket Notları & Araştırma</h3>
            <p className="text-xs text-slate-400">Sabitlenebilir zengin notlar ve mülakat tüyoları</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {notes.length > 0 && (
            <div className="w-48">
              <Input
                placeholder="Notlarda ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-3.5 h-3.5 text-slate-400" />}
              />
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Not Ekle
          </Button>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400">Not Bulunmuyor</p>
          <p className="text-[11px] text-slate-500">Şirket hakkında ilk araştırma notunuzu ekleyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl border transition-all space-y-2 relative group ${
                note.isPinned
                  ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/40 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-foreground truncate">{note.title}</h4>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(note.id)}
                    className={`p-1 rounded transition-colors ${
                      note.isPinned ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'
                    }`}
                    title={note.isPinned ? 'Sabitlemeyi Kaldır' : 'Başa Sabitle'}
                  >
                    <Pin className={`w-3.5 h-3.5 ${note.isPinned ? 'fill-amber-400' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(note.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Notu Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 text-[10px] text-slate-500 font-medium">
                {new Date(note.createdAt).toLocaleDateString('tr-TR')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Şirket Notu Ekle"
        description="Şirket kültürü, maaş skalaları veya mülakat tüyolarını kaydedin."
        size="md"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Not Başlığı *"
            placeholder="Örn: Frontend Ekip Mimarisi & Maaş Skalası"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Not İçeriği *</label>
            <textarea
              rows={4}
              required
              placeholder="Şirket notlarını detaylıca buraya yazın..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pinCheck"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-slate-300"
            />
            <label htmlFor="pinCheck" className="text-xs font-bold text-foreground cursor-pointer flex items-center gap-1">
              <Pin className="w-3.5 h-3.5 text-amber-400" />
              Notu En Başa Sabitle
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Notu Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

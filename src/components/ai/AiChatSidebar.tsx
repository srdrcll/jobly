import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Star, 
  Trash2, 
  Edit3, 
  Archive,
  Download,
  RotateCcw
} from 'lucide-react';
import { AiConversation } from '@/types/ai';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { aiService } from '@/services/aiService';

interface AiChatSidebarProps {
  conversations: AiConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onRename: (id: string, currentTitle: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AiChatSidebar: React.FC<AiChatSidebarProps> = ({
  conversations,
  activeId,
  onSelect,
  onNew,
  onRename,
  onToggleFavorite,
  onToggleArchive,
  onDelete,
}) => {
  const [search, setSearch] = useState('');
  const [viewArchived, setViewArchived] = useState(false);

  const filtered = conversations.filter((c) => {
    const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase().trim());
    const matchesArchived = viewArchived ? Boolean(c.isArchived) : !c.isArchived;
    return matchesSearch && matchesArchived;
  });

  const handleExportMarkdown = (e: React.MouseEvent, conv: AiConversation) => {
    e.stopPropagation();
    const mdContent = aiService.exportMarkdown(conv.id);
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${conv.title.replace(/[^a-z0-9]/gi, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <aside aria-label="Yapay Zekâ Sohbet Geçmişi" className="w-full md:w-72 bg-white dark:bg-slate-900/80 border-r border-slate-200 dark:border-slate-800/80 flex flex-col h-full shrink-0">
      {/* Top CTA */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800/80 space-y-3">
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={onNew}
          className="w-full justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md"
        >
          Yeni Sohbet Başlat
        </Button>

        <Input
          placeholder="Sohbetlerde ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5 text-slate-400" />}
        />

        {/* View Switcher: Active vs Archived */}
        <div className="flex items-center justify-between text-[11px] font-bold border-t border-slate-100 dark:border-slate-800/80 pt-2">
          <button
            type="button"
            onClick={() => setViewArchived(false)}
            className={`px-2 py-1 rounded-md transition-colors ${!viewArchived ? 'bg-purple-500/10 text-purple-400' : 'text-slate-400 hover:text-foreground'}`}
          >
            Aktif Sohbetler
          </button>
          <button
            type="button"
            onClick={() => setViewArchived(true)}
            className={`px-2 py-1 rounded-md transition-colors ${viewArchived ? 'bg-purple-500/10 text-purple-400' : 'text-slate-400 hover:text-foreground'}`}
          >
            Arşivlenmiş
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400">
            {viewArchived ? 'Arşivlenmiş sohbet bulunmuyor.' : 'Sohbet kaydı bulunamadı.'}
          </div>
        ) : (
          filtered.map((conv) => {
            const isActive = conv.id === activeId;

            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                  isActive
                    ? 'bg-purple-500/10 dark:bg-purple-950/30 border-purple-500/40 text-purple-400 font-bold'
                    : 'bg-slate-50/50 dark:bg-slate-900/40 border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span className="text-xs truncate">{conv.title}</span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(conv.id);
                    }}
                    className={`p-1 hover:scale-125 transition-transform ${
                      conv.isFavorite ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'
                    }`}
                    title="Favorilere Ekle"
                  >
                    <Star className={`w-3.5 h-3.5 ${conv.isFavorite ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleExportMarkdown(e, conv)}
                    className="p-1 text-slate-500 hover:text-purple-400 transition-colors"
                    title="Markdown Olarak İndir (.md)"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleArchive(conv.id);
                    }}
                    className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                    title={conv.isArchived ? 'Arşivden Çıkar' : 'Arşivle'}
                  >
                    {conv.isArchived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRename(conv.id, conv.title);
                    }}
                    className="p-1 text-slate-500 hover:text-indigo-400 transition-colors"
                    title="Yeniden Adlandır"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Sohbeti Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

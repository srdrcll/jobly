import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Settings as SettingsIcon, 
  PanelLeftClose, 
  PanelLeftOpen, 
  RotateCw,
  Plus
} from 'lucide-react';
import { 
  useAiConversationsQuery, 
  useAiConversationDetailQuery,
  useCreateAiConversationMutation,
  useRenameAiConversationMutation,
  useToggleAiFavoriteMutation,
  useDeleteAiConversationMutation,
  useSendAiMessageMutation,
  useAiSettingsQuery
} from '@/hooks/queries/useAiQuery';
import { AiChatSidebar } from '@/components/ai/AiChatSidebar';
import { AiMessageBubble } from '@/components/ai/AiMessageBubble';
import { AiSuggestedPrompts } from '@/components/ai/AiSuggestedPrompts';
import { AiSettingsModal } from '@/components/ai/AiSettingsModal';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { SuggestedPrompt } from '@/types/ai';

export const AiAssistantPage: React.FC = () => {
  // Queries & Mutations
  const { data: conversations = [] } = useAiConversationsQuery();
  const { data: settings } = useAiSettingsQuery();
  const createMutation = useCreateAiConversationMutation();
  const renameMutation = useRenameAiConversationMutation();
  const toggleFavMutation = useToggleAiFavoriteMutation();
  const deleteMutation = useDeleteAiConversationMutation();
  const sendMessageMutation = useSendAiMessageMutation();

  // Active Conversation State
  const [activeId, setActiveId] = useState<string | null>(null);

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (!activeId && conversations.length > 0) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  const { data: activeConversation } = useAiConversationDetailQuery(activeId || undefined);

  // UI States
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{ id: string; title: string } | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, sendMessageMutation.isPending]);

  // Handlers
  const handleNewConversation = () => {
    createMutation.mutate(
      { title: 'Yeni Kariyer Sohbeti', category: 'general' },
      {
        onSuccess: (newConv) => {
          setActiveId(newConv.id);
        },
      }
    );
  };

  const handleSelectSuggestedPrompt = (promptItem: SuggestedPrompt) => {
    createMutation.mutate(
      { title: promptItem.title, category: promptItem.category, initialMessage: promptItem.prompt },
      {
        onSuccess: (newConv) => {
          setActiveId(newConv.id);
        },
      }
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeId) return;

    const msg = inputMessage;
    setInputMessage('');

    sendMessageMutation.mutate({ conversationId: activeId, message: msg });
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (renameTarget && newTitle.trim()) {
      renameMutation.mutate(
        { id: renameTarget.id, newTitle: newTitle.trim() },
        {
          onSuccess: () => setRenameTarget(null),
        }
      );
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 shadow-soft dark:shadow-soft-dark animate-fadeIn">
      {/* 1. Left Sidebar (Conversations History) */}
      {isSidebarOpen && (
        <AiChatSidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={(id) => setActiveId(id)}
          onNew={handleNewConversation}
          onRename={(id, title) => {
            setRenameTarget({ id, title });
            setNewTitle(title);
          }}
          onToggleFavorite={(id) => toggleFavMutation.mutate(id)}
          onDelete={(id) => {
            deleteMutation.mutate(id);
            if (activeId === id) setActiveId(null);
          }}
        />
      )}

      {/* 2. Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header Bar */}
        <div className="h-14 px-4 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isSidebarOpen ? 'Kenar Çubuğunu Gizle' : 'Kenar Çubuğunu Göster'}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold text-foreground truncate">
                  {activeConversation?.title || 'Kariyer AI Asistanı'}
                </h2>
                <p className="text-[10px] text-slate-400 truncate">
                  Model: {settings?.model || 'Gemini 1.5 Pro'} • Persona: {settings?.persona || 'Kariyer Koçu'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<SettingsIcon className="w-3.5 h-3.5" />}
              onClick={() => setIsSettingsOpen(true)}
            >
              Model Ayarları
            </Button>
          </div>
        </div>

        {/* Chat Thread Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!activeConversation || activeConversation.messages.length <= 1 ? (
            /* Show Suggested Prompts Grid */
            <AiSuggestedPrompts onSelectPrompt={handleSelectSuggestedPrompt} />
          ) : (
            /* Render Message Thread */
            <div className="max-w-4xl mx-auto space-y-6">
              {activeConversation.messages.map((msg) => (
                <AiMessageBubble
                  key={msg.id}
                  message={msg}
                  onRegenerate={
                    msg.role === 'assistant'
                      ? () => sendMessageMutation.mutate({ conversationId: activeId!, message: 'Yanıtı yeniden üret ve alternatif öneriler sun.' })
                      : undefined
                  }
                />
              ))}

              {/* Typing Indicator */}
              {sendMessageMutation.isPending && (
                <div className="flex items-center gap-3 text-xs text-purple-400 font-semibold animate-pulse pl-2">
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Kariyer AI Asistanı yanıt hazırlıyor...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shrink-0">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="AI Kariyer Asistanına bir soru sorun veya tavsiye isteyin..."
                className="w-full h-11 pl-4 pr-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <div className="absolute right-3 top-3 text-[10px] text-slate-500 font-bold hidden sm:block">
                Enter ↵
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputMessage.trim() || sendMessageMutation.isPending}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Settings Modal */}
      <AiSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Rename Modal */}
      {renameTarget && (
        <Modal
          isOpen={Boolean(renameTarget)}
          onClose={() => setRenameTarget(null)}
          title="Sohbeti Yeniden Adlandır"
          description="Sohbet için açıklayıcı bir başlık yazın."
          size="sm"
        >
          <form onSubmit={handleRenameSubmit} className="space-y-4 pt-2">
            <Input
              label="Sohbet Başlığı *"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setRenameTarget(null)}>
                Vazgeç
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Kaydet
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AiAssistantPage;

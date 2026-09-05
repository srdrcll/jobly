import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Settings as SettingsIcon, 
  PanelLeftClose, 
  PanelLeftOpen, 
  RotateCw,
  MessageSquare,
  FileText,
  Mail,
  History,
  Target,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { 
  useAiConversationsQuery, 
  useAiConversationDetailQuery,
  useCreateAiConversationMutation,
  useRenameAiConversationMutation,
  useToggleAiFavoriteMutation,
  useToggleAiArchiveMutation,
  useDeleteAiConversationMutation,
  useSendAiMessageMutation,
  useAiSettingsQuery
} from '@/hooks/queries/useAiQuery';
import { AiChatSidebar } from '@/components/ai/AiChatSidebar';
import { AiMessageBubble } from '@/components/ai/AiMessageBubble';
import { AiSuggestedPrompts } from '@/components/ai/AiSuggestedPrompts';
import { AiSettingsModal } from '@/components/ai/AiSettingsModal';
import { ResumeReviewSection } from '@/components/ai/review/ResumeReviewSection';
import { CoverLetterReviewSection } from '@/components/ai/review/CoverLetterReviewSection';
import { ReviewVersionHistory } from '@/components/ai/review/ReviewVersionHistory';
import { AiReviewWidgets } from '@/components/ai/review/AiReviewWidgets';
import { AiInterviewCoachSection } from '@/components/ai/coach/AiInterviewCoachSection';
import { AiCareerInsightsSection } from '@/components/ai/coach/AiCareerInsightsSection';
import { AiCareerGoalsSection } from '@/components/ai/coach/AiCareerGoalsSection';
import { AiCoachWidgets } from '@/components/ai/coach/AiCoachWidgets';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { SuggestedPrompt } from '@/types/ai';

export const AiAssistantPage: React.FC = () => {
  // Main Module Tab: 'chat' | 'coach' | 'insights' | 'goals' | 'resume' | 'cover' | 'history'
  const [mainTab, setMainTab] = useState<'chat' | 'coach' | 'insights' | 'goals' | 'resume' | 'cover' | 'history'>('chat');

  // Queries & Mutations
  const { data: conversations = [] } = useAiConversationsQuery();
  const { data: settings } = useAiSettingsQuery();
  const createMutation = useCreateAiConversationMutation();
  const renameMutation = useRenameAiConversationMutation();
  const toggleFavMutation = useToggleAiFavoriteMutation();
  const toggleArchiveMutation = useToggleAiArchiveMutation();
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
    if (mainTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages, sendMessageMutation.isPending, mainTab]);

  // Handlers
  const handleNewConversation = () => {
    createMutation.mutate(
      { title: 'Yeni Kariyer Sohbeti', category: 'general' },
      {
        onSuccess: (newConv) => {
          setActiveId(newConv.id);
          setMainTab('chat');
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
          setMainTab('chat');
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
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner & Main Module Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-purple-500" />
            Yapay Zekâ Kariyer Asistanı & Mülakat Koçu
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Mülakat simülasyonu, kariyer dönüşüm analitiği, CV taraması ve hedef takibi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setMainTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'chat'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-foreground'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> AI Chat
          </button>
          <button
            type="button"
            onClick={() => setMainTab('coach')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'coach'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-foreground'
            }`}
          >
            <Target className="w-3.5 h-3.5" /> Mülakat Koçu
          </button>
          <button
            type="button"
            onClick={() => setMainTab('insights')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'insights'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-foreground'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Insights
          </button>
          <button
            type="button"
            onClick={() => setMainTab('goals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'goals'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-foreground'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Hedefler
          </button>
          <button
            type="button"
            onClick={() => setMainTab('resume')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'resume'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> CV Taraması
          </button>
          <button
            type="button"
            onClick={() => setMainTab('cover')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'cover'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-foreground'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Ön Mektup
          </button>
        </div>
      </div>

      {/* 2. Summary KPI Widgets */}
      {mainTab === 'coach' || mainTab === 'insights' || mainTab === 'goals' ? (
        <AiCoachWidgets />
      ) : (
        <AiReviewWidgets />
      )}

      {/* 3. TAB 1: AI CHAT INTERFACE */}
      {mainTab === 'chat' && (
        <div className="h-[calc(100vh-14rem)] flex overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#131D33] shadow-soft dark:shadow-soft-dark">
          {/* Left Sidebar */}
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
              onToggleArchive={(id) => toggleArchiveMutation.mutate(id)}
              onDelete={(id) => {
                deleteMutation.mutate(id);
                if (activeId === id) setActiveId(null);
              }}
            />
          )}

          {/* Main Chat Area */}
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

              <Button
                variant="outline"
                size="sm"
                leftIcon={<SettingsIcon className="w-3.5 h-3.5" />}
                onClick={() => setIsSettingsOpen(true)}
              >
                Model Ayarları
              </Button>
            </div>

            {/* Chat Thread Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {!activeConversation || activeConversation.messages.length <= 1 ? (
                <AiSuggestedPrompts onSelectPrompt={handleSelectSuggestedPrompt} />
              ) : (
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="AI Kariyer Asistanına bir soru sorun..."
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
                  aria-label="Mesaj gönder"
                  disabled={!inputMessage.trim() || sendMessageMutation.isPending}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shrink-0 shadow-md"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: AI INTERVIEW COACH */}
      {mainTab === 'coach' && <AiInterviewCoachSection />}

      {/* 5. TAB 3: CAREER INSIGHTS */}
      {mainTab === 'insights' && <AiCareerInsightsSection />}

      {/* 6. TAB 4: CAREER GOALS */}
      {mainTab === 'goals' && <AiCareerGoalsSection />}

      {/* 7. TAB 5: RESUME REVIEW */}
      {mainTab === 'resume' && <ResumeReviewSection />}

      {/* 8. TAB 6: COVER LETTER REVIEW */}
      {mainTab === 'cover' && <CoverLetterReviewSection />}

      {/* 9. TAB 7: REVIEW VERSION HISTORY */}
      {mainTab === 'history' && <ReviewVersionHistory />}

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

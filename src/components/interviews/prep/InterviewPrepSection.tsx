import React, { useState } from 'react';
import { 
  CheckSquare, 
  BookOpen, 
  Code, 
  HelpCircle, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles 
} from 'lucide-react';
import { 
  InterviewPrepData, 
  getInterviewPrep, 
  saveInterviewPrep, 
  calculatePrepProgress 
} from '@/utils/interviewCrmPrepUtils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface InterviewPrepSectionProps {
  interviewId: string;
}

export const InterviewPrepSection: React.FC<InterviewPrepSectionProps> = ({ interviewId }) => {
  const [prep, setPrep] = useState<InterviewPrepData>(() => getInterviewPrep(interviewId));
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newTechTopic, setNewTechTopic] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const progress = calculatePrepProgress(prep);

  // Toggle Checklist
  const handleToggleChecklist = (id: string) => {
    const updated = {
      ...prep,
      checklist: prep.checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    };
    setPrep(updated);
    saveInterviewPrep(updated);
  };

  // Add Checklist Item
  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistItem.trim()) return;

    const newItem = {
      id: `c-${Date.now()}`,
      text: newChecklistItem.trim(),
      completed: false,
    };

    const updated = {
      ...prep,
      checklist: [...prep.checklist, newItem],
    };
    setPrep(updated);
    saveInterviewPrep(updated);
    setNewChecklistItem('');
  };

  // Delete Checklist Item
  const handleDeleteChecklistItem = (id: string) => {
    const updated = {
      ...prep,
      checklist: prep.checklist.filter((i) => i.id !== id),
    };
    setPrep(updated);
    saveInterviewPrep(updated);
  };

  // Add Tech Topic
  const handleAddTechTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechTopic.trim()) return;
    const updated = {
      ...prep,
      technicalTopics: [...prep.technicalTopics, newTechTopic.trim()],
    };
    setPrep(updated);
    saveInterviewPrep(updated);
    setNewTechTopic('');
  };

  // Add Question to Ask
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const updated = {
      ...prep,
      questionsToAsk: [...prep.questionsToAsk, newQuestion.trim()],
    };
    setPrep(updated);
    saveInterviewPrep(updated);
    setNewQuestion('');
  };

  // Save Text Fields
  const handleSaveNotes = () => {
    saveInterviewPrep(prep);
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-6">
      {/* Header with Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Mülakat Hazırlık Araçları</h3>
            <p className="text-xs text-slate-400">Kontrol listesi, teknik konular ve mülakatçı soruları</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-purple-400">%{progress} Tamamlandı</span>
            <div className="w-32 h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 1. Preparation Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-purple-400" />
            Mülakat Öncesi Kontrol Listesi
          </h4>
          <span className="text-[11px] text-slate-500 font-medium">
            {prep.checklist.filter((c) => c.completed).length} / {prep.checklist.length} Tamamlandı
          </span>
        </div>

        <div className="space-y-2">
          {prep.checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleChecklist(item.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                item.completed
                  ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60 opacity-60'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleChecklist(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded text-purple-500 focus:ring-purple-500 border-slate-300"
                />
                <span className={`text-xs font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-foreground'}`}>
                  {item.text}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChecklistItem(item.id);
                }}
                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Checklist Item Form */}
        <form onSubmit={handleAddChecklistItem} className="flex gap-2 pt-1">
          <Input
            placeholder="Yeni kontrol maddesi ekle..."
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
          />
          <Button type="submit" variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Ekle
          </Button>
        </form>
      </div>

      {/* 2. Technical Topics & Questions to Ask */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Technical Topics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-indigo-400" />
            Teknik Konular & Mimari
          </h4>
          <div className="space-y-1.5">
            {prep.technicalTopics.map((topic, index) => (
              <div
                key={index}
                className="p-2.5 rounded-lg bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 text-xs font-bold text-indigo-300 flex items-center justify-between"
              >
                <span>• {topic}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddTechTopic} className="flex gap-2 pt-1">
            <Input
              placeholder="Örn: React 19 Hydration"
              value={newTechTopic}
              onChange={(e) => setNewTechTopic(e.target.value)}
            />
            <Button type="submit" variant="outline" size="sm">
              Ekle
            </Button>
          </form>
        </div>

        {/* Questions to Ask Interviewer */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Mülakatçıya Sorulacak Sorular
          </h4>
          <div className="space-y-1.5">
            {prep.questionsToAsk.map((q, index) => (
              <div
                key={index}
                className="p-2.5 rounded-lg bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-xs font-medium text-slate-200"
              >
                ❓ {q}
              </div>
            ))}
          </div>
          <form onSubmit={handleAddQuestion} className="flex gap-2 pt-1">
            <Input
              placeholder="Örn: Ekibin 6 aylık ana hedefi nedir?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <Button type="submit" variant="outline" size="sm">
              Ekle
            </Button>
          </form>
        </div>
      </div>

      {/* 3. Company & Role Research Text Areas */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-400" />
            Şirket & Ürün Araştırma Notları
          </label>
          <textarea
            rows={3}
            value={prep.companyResearch}
            onChange={(e) => setPrep({ ...prep, companyResearch: e.target.value })}
            onBlur={handleSaveNotes}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            Kişisel Mülakat Stratejisi Notları
          </label>
          <textarea
            rows={3}
            value={prep.personalNotes}
            onChange={(e) => setPrep({ ...prep, personalNotes: e.target.value })}
            onBlur={handleSaveNotes}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};

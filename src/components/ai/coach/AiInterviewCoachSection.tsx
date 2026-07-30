import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  Award,
  Building2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { 
  useGenerateCoachSessionMutation, 
  useEvaluateAnswerMutation, 
  useAiCoachSessionsQuery 
} from '@/hooks/queries/useAiCoachQuery';
import { SeniorityLevel, CoachSession, CoachQuestion, AnswerEvaluation } from '@/types/aiCoach';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const AiInterviewCoachSection: React.FC = () => {
  const { data: sessions = [] } = useAiCoachSessionsQuery();
  const generateMutation = useGenerateCoachSessionMutation();
  const evaluateMutation = useEvaluateAnswerMutation();

  // Form State
  const [companyName, setCompanyName] = useState('Trendyol Tech');
  const [position, setPosition] = useState('Senior Frontend Developer');
  const [interviewType, setInterviewType] = useState('Online');
  const [seniority, setSeniority] = useState<SeniorityLevel>('Senior');

  // Active Session & Evaluation State
  const [activeSession, setActiveSession] = useState<CoachSession | null>(() => sessions[0] || null);
  const [selectedQuestion, setSelectedQuestion] = useState<CoachQuestion | null>(null);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<AnswerEvaluation | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateMutation.mutate(
      { companyName, position, interviewType, seniority },
      {
        onSuccess: (session) => {
          setActiveSession(session);
          setSelectedQuestion(session.questions[0]);
          setEvaluationResult(null);
          setUserAnswerText('');
        },
      }
    );
  };

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion || !userAnswerText.trim()) return;

    evaluateMutation.mutate(
      { questionText: selectedQuestion.questionText, userAnswerText },
      {
        onSuccess: (result) => {
          setEvaluationResult(result);
        },
      }
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Coach Setup Form */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">AI Mülakat Simülasyonu & Soru Koçu</h3>
            <p className="text-xs text-slate-400">Şirket ve pozisyona özel 6 kategoride mülakat simülasyonu</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <Input
            label="Hedef Şirket"
            placeholder="Örn: Trendyol"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <Input
            label="Pozisyon Adı"
            placeholder="Örn: Senior Frontend Dev"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Kıdem Seviyesi</label>
            <select
              value={seniority}
              onChange={(e) => setSeniority(e.target.value as SeniorityLevel)}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-foreground focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="Junior">🟢 Junior (0-2 Yıl)</option>
              <option value="Mid-Level">🔵 Mid-Level (2-5 Yıl)</option>
              <option value="Senior">🟡 Senior (5+ Yıl)</option>
              <option value="Lead / Principal">🔴 Lead / Principal (8+ Yıl)</option>
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={generateMutation.isPending}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md h-10"
            >
              Simülasyon Başlat
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Questions & Answer Evaluation Workspace */}
      {activeSession && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Question List (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 shadow-soft dark:shadow-soft-dark space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Oluşturulan Mülakat Soruları ({activeSession.questions.length})
              </h4>
              <span className="text-[10px] font-bold text-purple-400">{activeSession.position}</span>
            </div>

            <div className="space-y-2">
              {activeSession.questions.map((q) => {
                const isSelected = selectedQuestion?.id === q.id;

                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestion(q);
                      setEvaluationResult(null);
                      setUserAnswerText('');
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {q.category}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <p className="text-xs text-foreground line-clamp-2">{q.questionText}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Answer & Evaluation Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-5">
            {selectedQuestion ? (
              <>
                <div className="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {selectedQuestion.category} Soru
                  </span>
                  <h3 className="text-sm font-bold text-foreground leading-snug">
                    {selectedQuestion.questionText}
                  </h3>
                </div>

                {/* Candidate Practice Answer Form */}
                <form onSubmit={handleEvaluate} className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Senin Deneme Yanıtın (STAR Yöntemi ile)</label>
                    <textarea
                      rows={4}
                      value={userAnswerText}
                      onChange={(e) => setUserAnswerText(e.target.value)}
                      placeholder="Soruyu nasıl yanıtlardınız? (Örn: Durum, Görev, Aksiyon ve Başarı Oranı belirtin)..."
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      isLoading={evaluateMutation.isPending}
                      leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                    >
                      Yanıtımı Yapay Zekâ ile Değerlendir
                    </Button>
                  </div>
                </form>

                {/* AI Answer Evaluation Result */}
                {evaluationResult && (
                  <div className="p-4 rounded-xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/30 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-400" /> AI Yanıt Değerlendirme Raporu
                      </span>
                      <span className="text-sm font-black text-amber-400 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        {evaluationResult.score} / 100
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-emerald-400">👍 Güçlü Yanlar:</p>
                      <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                        {evaluationResult.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-amber-400">💡 Geliştirme Tavsiyeleri:</p>
                      <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                        {evaluationResult.suggestedImprovements.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-purple-500/20">
                      <span className="text-[11px] font-bold text-indigo-300 block mb-1">
                        🌟 Örnek Ideal Cevap Yapısı:
                      </span>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{evaluationResult.exampleBetterAnswer}"
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Sol listeden bir mülakat sorusu seçerek deneme yanıtınızı değerlendirin.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

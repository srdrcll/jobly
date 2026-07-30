import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Trash2, Calendar } from 'lucide-react';
import { 
  useAiCareerGoalsQuery, 
  useCreateCareerGoalMutation, 
  useToggleCareerGoalMutation, 
  useDeleteCareerGoalMutation 
} from '@/hooks/queries/useAiCoachQuery';
import { CareerGoal } from '@/types/aiCoach';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export const AiCareerGoalsSection: React.FC = () => {
  const { data: goals = [] } = useAiCareerGoalsQuery();
  const createMutation = useCreateCareerGoalMutation();
  const toggleMutation = useToggleCareerGoalMutation();
  const deleteMutation = useDeleteCareerGoalMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetCount, setTargetCount] = useState(15);
  const [category, setCategory] = useState<CareerGoal['category']>('applications');
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createMutation.mutate(
      {
        title,
        targetCount,
        currentProgress: 0,
        category,
        targetDate,
      },
      {
        onSuccess: () => {
          setTitle('');
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Kariyer Hedefleri & Otomatik Takip</h3>
            <p className="text-xs text-slate-400">Aylık başvuru, mülakat randevusu ve teklif hedefleriniz</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setIsModalOpen(true)}
        >
          Hedef Oluştur
        </Button>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
          Henüz belirlenmiş kariyer hedefi bulunmuyor.
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.currentProgress / (goal.targetCount || 1)) * 100));

            return (
              <div
                key={goal.id}
                className={`p-4 rounded-xl border transition-all space-y-2 ${
                  goal.completed
                    ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60 opacity-60'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleMutation.mutate(goal.id)}
                      className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 border-slate-300 cursor-pointer"
                    />
                    <h4 className={`text-xs font-bold ${goal.completed ? 'line-through text-slate-500' : 'text-foreground'} truncate`}>
                      {goal.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-black text-teal-400">
                      {goal.currentProgress} / {goal.targetCount} (%{pct})
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteMutation.mutate(goal.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Hedefi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Goal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Kariyer Hedefi Belirle"
        description="Aylık başvuru veya mülakat hedeflerinizi ekleyin."
        size="md"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Hedef Tanımı *"
            placeholder="Örn: Bu Ay 20 Kaliteli Başvuru Yap"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Hedef Sayısı"
              type="number"
              value={targetCount}
              onChange={(e) => setTargetCount(parseInt(e.target.value) || 1)}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-foreground focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="applications">📩 Başvuru Sayısı</option>
                <option value="interviews">👥 Mülakat Randevusu</option>
                <option value="offers">🏆 İş Teklifi</option>
                <option value="success_rate">📈 Başarı Oranı</option>
              </select>
            </div>
          </div>

          <Input
            label="Hedef Son Tarihi"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={createMutation.isPending}>
              Hedefi Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

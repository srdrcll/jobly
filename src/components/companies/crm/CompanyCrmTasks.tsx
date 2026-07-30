import React, { useState } from 'react';
import { CheckSquare, Plus, Calendar, AlertCircle } from 'lucide-react';
import { 
  CompanyTaskItem, 
  getCompanyTasks, 
  saveCompanyTask, 
  toggleCompanyTaskCompleted 
} from '@/utils/companyCrmUtils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface CompanyCrmTasksProps {
  companyId: string;
}

export const CompanyCrmTasks: React.FC<CompanyCrmTasksProps> = ({ companyId }) => {
  const [tasks, setTasks] = useState<CompanyTaskItem[]>(() => getCompanyTasks(companyId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<CompanyTaskItem['priority']>('Orta');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    saveCompanyTask({
      companyId,
      title,
      description: description || undefined,
      dueDate: dueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority,
      status: 'Pending',
    });

    setTasks(getCompanyTasks(companyId));
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Orta');
    setIsModalOpen(false);
  };

  const handleToggle = (id: string) => {
    toggleCompanyTaskCompleted(id);
    setTasks(getCompanyTasks(companyId));
  };

  const getPriorityBadge = (p: CompanyTaskItem['priority']) => {
    switch (p) {
      case 'Kritik':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Yüksek':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Orta':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Düşük':
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Şirket Görevleri & Takip İtemleri</h3>
            <p className="text-xs text-slate-400">Takip mesajları, cv iletimi ve teknik araştırmalar</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setIsModalOpen(true)}
        >
          Görev Ekle
        </Button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400">Planlanmış Görev Yok</p>
          <p className="text-[11px] text-slate-500">Bu şirket için ilk takip görevinizi ekleyin.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggle(task.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                task.completed
                  ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60 opacity-60'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-indigo-500/30'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 w-4 h-4 rounded text-teal-500 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5 min-w-0">
                  <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-foreground'}`}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-[11px] text-slate-400 leading-snug">{task.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getPriorityBadge(task.priority)}`}>
                  {task.priority}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Şirket Görevi Ekle"
        description="Şirkete özel takip aksiyonu veya cv iletim hatırlatıcısı oluşturun."
        size="md"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Görev Başlığı *"
            placeholder="Örn: İK Yetkilisine Takip Mesajı Gönder"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Görev Açıklaması</label>
            <textarea
              rows={3}
              placeholder="Görev detayları..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Son Tarih (Due Date)"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Öncelik Seviyesi</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Düşük">🟢 Düşük</option>
                <option value="Orta">🔵 Orta</option>
                <option value="Yüksek">🟡 Yüksek</option>
                <option value="Kritik">🔴 Kritik</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Görevi Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

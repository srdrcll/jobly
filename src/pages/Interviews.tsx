import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Clock, 
  Video, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  Eye, 
  RefreshCw, 
  AlertCircle,
  Award,
  CheckCircle2,
  Sparkles,
  List,
  BarChart3
} from 'lucide-react';
import { useInterviewsListQuery, useDeleteInterviewMutation } from '@/hooks/queries/useInterviewsQuery';
import { DbInterview } from '@/types';
import { InterviewStatusBadge } from '@/components/interviews/InterviewStatusBadge';
import { CreateInterviewModal } from '@/components/interviews/CreateInterviewModal';
import { EditInterviewModal } from '@/components/interviews/EditInterviewModal';
import { InterviewDetailModal } from '@/components/interviews/InterviewDetailModal';
import { InterviewWidgets } from '@/components/interviews/prep/InterviewWidgets';
import { InterviewCalendar } from '@/components/interviews/calendar/InterviewCalendar';
import { InterviewAnalyticsSection } from '@/components/interviews/InterviewAnalyticsSection';
import { getNextInterviewCountdown } from '@/utils/interviewAnalyticsChartsUtils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TableSkeleton } from '@/components/ui/Skeleton';

export const InterviewsPage: React.FC = () => {
  // Queries & Mutations
  const { data: interviews = [], isLoading, isError, error, refetch } = useInterviewsListQuery();
  const deleteMutation = useDeleteInterviewMutation();

  // View Mode: 'list' | 'calendar' | 'analytics'
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'analytics'>('list');

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DbInterview | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<DbInterview | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date_asc' | 'date_desc' | 'company'>('date_asc');

  // Next Interview Countdown calculation
  const countdownInfo = useMemo(() => getNextInterviewCountdown(interviews), [interviews]);

  // Filtered & Sorted Interviews
  const filteredInterviews = useMemo(() => {
    return interviews
      .filter((interview) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          interview.company_name.toLowerCase().includes(query) ||
          interview.position.toLowerCase().includes(query) ||
          (interview.interviewer_name && interview.interviewer_name.toLowerCase().includes(query)) ||
          (interview.stage && interview.stage.toLowerCase().includes(query));

        const matchesResult = selectedResult === 'all' || interview.result === selectedResult;
        const matchesType = selectedType === 'all' || interview.type === selectedType;

        return matchesSearch && matchesResult && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'company') {
          return a.company_name.localeCompare(b.company_name, 'tr');
        }
        const timeA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        const timeB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        if (sortBy === 'date_desc') {
          return timeB - timeA;
        }
        return timeA - timeB;
      });
  }, [interviews, searchQuery, selectedResult, selectedType, sortBy]);

  // Metric counts
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const upcoming24hCount = useMemo(() => {
    return interviews.filter((i) => {
      const d = new Date(`${i.date}T${i.time || '00:00'}`);
      return !isNaN(d.getTime()) && d >= now && d <= twentyFourHoursLater;
    }).length;
  }, [interviews, now, twentyFourHoursLater]);

  const passedCount = useMemo(() => interviews.filter((i) => i.result === 'Passed').length, [interviews]);
  const offersCount = useMemo(() => interviews.filter((i) => i.result === 'Offer').length, [interviews]);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          if (selectedDetail?.id === deleteId) setSelectedDetail(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header & Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <CalendarIcon className="w-7 h-7 text-purple-500" />
            Mülakat Yönetimi & Takvim
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Teknik görüşmelerinizi, İK mülakatlarınızı ve vaka sunumlarınızı takip edin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Buttons */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-foreground'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Liste
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'calendar'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-foreground'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" /> Takvim
            </button>
            <button
              type="button"
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'analytics'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-foreground'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analiz
            </button>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateOpen(true)}
            className="shrink-0 focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            Yeni Mülakat Planla
          </Button>
        </div>
      </div>

      {/* 2. Next Interview Countdown Banner (If upcoming interview exists) */}
      {countdownInfo.interview && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900 border border-purple-500/30 text-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-300">
                Sıradaki Mülakat Geri Sayımı
              </span>
              <h3 className="text-sm font-bold text-white">
                {countdownInfo.interview.company_name} — {countdownInfo.interview.position} ({countdownInfo.interview.stage || 'Mülakat'})
              </h3>
              <p className="text-xs text-purple-200/80">
                {new Date(countdownInfo.interview.date).toLocaleDateString('tr-TR')} saat {countdownInfo.interview.time || '14:00'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-sm font-black text-amber-300">{countdownInfo.countdownText}</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSelectedDetail(countdownInfo.interview)}
            >
              Gözden Geçir
            </Button>
          </div>
        </div>
      )}

      {/* 3. KPI Summary Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Toplam Randevu</span>
            <p className="text-lg font-extrabold text-foreground">{interviews.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">24 Saat İçinde</span>
            <p className="text-lg font-extrabold text-foreground">{upcoming24hCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Başarılı Geçenler</span>
            <p className="text-lg font-extrabold text-foreground">{passedCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Teklifler</span>
            <p className="text-lg font-extrabold text-foreground">{offersCount}</p>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <InterviewCalendar
          interviews={interviews}
          onSelectInterview={(item) => setSelectedDetail(item)}
        />
      )}

      {/* VIEW MODE 2: ANALYTICS VIEW */}
      {viewMode === 'analytics' && (
        <InterviewAnalyticsSection interviews={interviews} />
      )}

      {/* VIEW MODE 3: LIST & TABLE VIEW */}
      {viewMode === 'list' && (
        <>
          {/* Reusable Widgets (Upcoming & Monthly Pace) */}
          <InterviewWidgets interviews={interviews} onSelectInterview={(item) => setSelectedDetail(item)} />

          {/* Toolbar: Search, Filters & Sorting */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft dark:shadow-soft-dark space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <Input
                  placeholder="Şirket, pozisyon veya mülakatçı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                />
              </div>

              {/* Result Filter */}
              <select
                value={selectedResult}
                onChange={(e) => setSelectedResult(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-purple-500 outline-none font-semibold"
              >
                <option value="all">Tüm Sonuçlar</option>
                <option value="Pending">⏳ Beklemede</option>
                <option value="Passed">✅ Başarılı / Olumlu</option>
                <option value="Failed">❌ Olumsuz</option>
                <option value="Offer">🏆 Teklif Alındı</option>
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-purple-500 outline-none font-semibold"
              >
                <option value="all">Tüm Türler</option>
                <option value="Online">📹 Online</option>
                <option value="On-site">🏢 Ofiste (Yüz Yüze)</option>
                <option value="Phone">📞 Telefon</option>
                <option value="Hybrid">🔀 Hibrit</option>
              </select>

              {/* Sorting */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-purple-500 outline-none font-semibold"
              >
                <option value="date_asc">Sıralama: En Yakın Tarih</option>
                <option value="date_desc">Sıralama: En Yeni Eklenen</option>
                <option value="company">Sıralama: Şirket Adı (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Data Views (Table for Desktop, Cards for Mobile) */}
          {isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <div 
              role="alert"
              className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-rose-200">Mülakatlar Yüklenemedi</p>
                  <p className="text-rose-300/80">{error?.message || 'Veritabanına erişilirken sorun oluştu.'}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20 shrink-0"
              >
                Tekrar Dene
              </Button>
            </div>
          ) : filteredInterviews.length === 0 ? (
            /* Empty State */
            <div className="p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
                <CalendarIcon className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-bold text-foreground">Mülakat Kaydı Bulunamadı</h3>
                <p className="text-xs text-slate-400">
                  Arama kriterlerinize uyan mülakat bulunamadı veya henüz bir mülakat planlamadınız.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setIsCreateOpen(true)}
              >
                İlk Mülakatı Planla
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Responsive Table */}
              <div className="hidden md:block bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-soft dark:shadow-soft-dark">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-3.5 px-4">Şirket & Pozisyon</th>
                      <th className="py-3.5 px-4">Aşama</th>
                      <th className="py-3.5 px-4">Tarih & Saat</th>
                      <th className="py-3.5 px-4">Tür & Katılım</th>
                      <th className="py-3.5 px-4">Sonuç</th>
                      <th className="py-3.5 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                    {filteredInterviews.map((interview) => (
                      <tr
                        key={interview.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                        onClick={() => setSelectedDetail(interview)}
                      >
                        {/* Company & Position */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-extrabold flex items-center justify-center text-sm shrink-0">
                              {interview.company_name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-foreground group-hover:text-purple-400 transition-colors truncate">
                                {interview.position}
                              </p>
                              <span className="text-[11px] text-slate-400 truncate block">
                                {interview.company_name}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Stage */}
                        <td className="py-3.5 px-4 font-semibold text-slate-300">
                          {interview.stage || 'İK Görüşmesi'}
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>{new Date(interview.date).toLocaleDateString('tr-TR')} — {interview.time || '14:00'}</span>
                          </div>
                        </td>

                        {/* Type & Meeting Link */}
                        <td className="py-3.5 px-4">
                          {interview.meeting_link ? (
                            <a
                              href={interview.meeting_link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-indigo-400 hover:underline font-bold"
                            >
                              <Video className="w-3.5 h-3.5" />
                              Toplantıya Katıl <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400">{interview.type || 'Online'}</span>
                          )}
                        </td>

                        {/* Result Badge */}
                        <td className="py-3.5 px-4">
                          <InterviewStatusBadge result={interview.result} />
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setSelectedDetail(interview)}
                              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-400 transition-colors"
                              title="Detay Gör"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedEdit(interview)}
                              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-400 transition-colors"
                              title="Düzenle"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteId(interview.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid View */}
              <div className="md:hidden grid grid-cols-1 gap-4">
                {filteredInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    onClick={() => setSelectedDetail(interview)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-3 cursor-pointer hover:border-purple-500/40 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center shrink-0">
                          {interview.company_name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-foreground truncate">{interview.position}</h4>
                          <p className="text-xs text-slate-400 truncate">{interview.company_name}</p>
                        </div>
                      </div>
                      <InterviewStatusBadge result={interview.result} />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>{new Date(interview.date).toLocaleDateString('tr-TR')} — {interview.time || '14:00'}</span>
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{interview.stage || 'Mülakat'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Modals */}
      <CreateInterviewModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      <EditInterviewModal
        interview={selectedEdit}
        isOpen={Boolean(selectedEdit)}
        onClose={() => setSelectedEdit(null)}
      />

      <InterviewDetailModal
        interview={selectedDetail}
        isOpen={Boolean(selectedDetail)}
        onClose={() => setSelectedDetail(null)}
        onEdit={(item) => setSelectedEdit(item)}
        onDelete={(id) => setDeleteId(id)}
      />

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-rose-300">Mülakat Kaydını Sil</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bu mülakat randevusunu takviminizden silmek istediğinizden emin misiniz?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>
                Vazgeç
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={deleteMutation.isPending}
                onClick={handleDeleteConfirm}
              >
                Evet, Sil
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewsPage;

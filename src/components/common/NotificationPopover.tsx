import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Calendar, 
  Briefcase, 
  Sparkles, 
  X,
  Clock
} from 'lucide-react';
import { useInterviewsListQuery } from '@/hooks/queries/useInterviewsQuery';
import { formatDate } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
  id: string;
  type: 'interview' | 'application' | 'tip';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  link?: string;
}

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onHasUnreadChange?: (hasUnread: boolean) => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  onHasUnreadChange,
}) => {
  const navigate = useNavigate();
  const popoverRef = useRef<HTMLDivElement>(null);

  const { data: interviews = [] } = useInterviewsListQuery();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      type: 'interview',
      title: 'Yaklaşan Mülakat Hatırlatması',
      description: 'Trendyol - İK Görüşmesi mülakatınız yarın saat 14:00\'te.',
      time: 'Yarın 14:00',
      isRead: false,
      link: '/interviews',
    },
    {
      id: 'n-2',
      type: 'application',
      title: 'Başvuru Güncellendi',
      description: 'Mackolik başvuru durumunuz "Mülakat Aşamasında" olarak güncellendi.',
      time: '2 saat önce',
      isRead: false,
      link: '/applications',
    },
    {
      id: 'n-3',
      type: 'tip',
      title: 'Yapay Zeka İpucu',
      description: 'Son başvurunuz için 1 tıkla kişiselleştirilmiş Ön Mektup üretebilirsiniz.',
      time: 'Bugün',
      isRead: false,
      link: '/applications',
    },
  ]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Check unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    onHasUnreadChange?.(unreadCount > 0);
  }, [unreadCount, onHasUnreadChange]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleItemClick = (notif: NotificationItem) => {
    handleMarkOneRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#141E34] border border-slate-200 dark:border-slate-700/60 shadow-2xl z-50 overflow-hidden animate-fadeIn"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-500" />
          <h3 className="font-bold text-sm text-foreground">Bildirimler</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-black bg-blue-500 text-white rounded-full">
              {unreadCount} Yeni
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
              title="Tümünü okundu işaretle"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Tümünü Okundu Say
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            Bildiriminiz bulunmuyor.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif)}
              className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                notif.isRead 
                  ? 'bg-white dark:bg-slate-900 opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-slate-800/50' 
                  : 'bg-blue-500/5 dark:bg-blue-500/10 hover:bg-blue-500/10 dark:hover:bg-blue-500/15'
              }`}
            >
              {/* Notification Type Icon */}
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                {notif.type === 'interview' ? (
                  <Calendar className="w-4 h-4 text-purple-400" />
                ) : notif.type === 'tip' ? (
                  <Sparkles className="w-4 h-4 text-amber-400" />
                ) : (
                  <Briefcase className="w-4 h-4 text-blue-500" />
                )}
              </div>

              {/* Notification Body */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-foreground truncate">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> {notif.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                  {notif.description}
                </p>
              </div>

              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/80 text-center">
        <button
          onClick={() => {
            navigate('/interviews');
            onClose();
          }}
          className="text-xs font-bold text-blue-500 hover:underline"
        >
          Tüm Mülakat & Hatırlatıcıları Gör →
        </button>
      </div>
    </div>
  );
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { remindersService } from '@/services/remindersService';
import { ReminderFormValues } from '@/lib/validations/reminderSchema';
import { DbReminderUpdate } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useRemindersListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.reminders.lists(),
    queryFn: () => remindersService.fetchReminders(),
    enabled: Boolean(user),
  });
}

export function useCreateReminderMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: ReminderFormValues) => {
      if (!user?.id) throw new Error('Oturum açmış kullanıcı bulunamadı.');
      return remindersService.createReminder(user.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reminders.lists() });
      toast.success('Hatırlatma Eklendi', 'Mülakat/görev hatırlatması takviminize eklendi.');
    },
    onError: (error: Error) => {
      toast.error('İşlem Başarısız', error.message);
    },
  });
}

export function useUpdateReminderMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DbReminderUpdate }) =>
      remindersService.updateReminder(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reminders.lists() });
      toast.success('Hatırlatma Güncellendi', 'Hatırlatma durumu kaydedildi.');
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message);
    },
  });
}

export function useDeleteReminderMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => remindersService.deleteReminder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reminders.lists() });
      toast.success('Hatırlatma Silindi', 'Hatırlatma kaydı kaldırıldı.');
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message);
    },
  });
}

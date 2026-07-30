import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { interviewsService } from '@/services/interviewsService';
import { InterviewFormValues } from '@/lib/validations/interviewSchema';
import { DbInterviewUpdate } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useInterviewsListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.interviews.lists(),
    queryFn: () => interviewsService.fetchInterviews(),
    enabled: Boolean(user),
    staleTime: 1000 * 60 * 2, // 2 minutes stale time
    gcTime: 1000 * 60 * 10, // 10 minutes cache time
  });
}

export function useInterviewDetailQuery(id?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.interviews.detail(id || ''),
    queryFn: () => interviewsService.fetchInterviewById(id!),
    enabled: Boolean(user && id),
  });
}

export function useCreateInterviewMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: InterviewFormValues) => {
      if (!user?.id) throw new Error('Oturum açmış kullanıcı bulunamadı.');
      return interviewsService.createInterview(user.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.lists() });
      toast.success('Mülakat Planlandı', 'Takviminize yeni randevu eklendi.');
    },
    onError: (error: Error) => {
      toast.error('İşlem Başarısız', error.message || 'Mülakat eklenirken sorun oluştu.');
    },
  });
}

export function useUpdateInterviewMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DbInterviewUpdate }) =>
      interviewsService.updateInterview(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.detail(variables.id) });
      toast.success('Mülakat Güncellendi', 'Randevu detayları kaydedildi.');
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message);
    },
  });
}

export function useDeleteInterviewMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => interviewsService.deleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.lists() });
      toast.success('Mülakat Silindi', 'Mülakat kaydı takvimden kaldırıldı.');
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message);
    },
  });
}

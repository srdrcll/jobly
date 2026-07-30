import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { applicationsService } from '@/services/applicationsService';
import { ApplicationFormValues } from '@/lib/validations/applicationSchema';
import { DbApplicationUpdate } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useApplicationsListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.applications.lists(),
    queryFn: () => applicationsService.fetchApplications(),
    enabled: Boolean(user),
  });
}

export function useCreateApplicationMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: ApplicationFormValues) => {
      if (!user?.id) throw new Error('Oturum açmış kullanıcı bulunamadı.');
      return applicationsService.createApplication(user.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
      toast.success('Başvuru Oluşturuldu', 'Yeni iş başvurusu başarıyla veritabanına eklendi.');
    },
    onError: (error: Error) => {
      toast.error('İşlem Başarısız', error.message || 'Başvuru eklenirken bir sorun oluştu.');
    },
  });
}

export function useUpdateApplicationMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DbApplicationUpdate }) =>
      applicationsService.updateApplication(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.detail(variables.id) });
      toast.success('Başvuru Güncellendi', 'İş başvurusu detayları kaydedildi.');
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message || 'Başvuru güncellenirken sorun oluştu.');
    },
  });
}

export function useDeleteApplicationMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => applicationsService.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
      toast.success('Başvuru Silindi', 'Seçilen iş başvurusu veritabanından kaldırıldı.');
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message || 'Başvuru silinirken sorun oluştu.');
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { applicationsService } from '@/services/applicationsService';
import { ApplicationFormValues } from '@/lib/validations/applicationSchema';
import { DbApplication, DbApplicationUpdate, ApplicationStatus } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useApplicationsListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.applications.lists(),
    queryFn: () => applicationsService.fetchApplications(),
    enabled: Boolean(user),
    staleTime: 1000 * 60 * 2, // 2 minutes stale time
    gcTime: 1000 * 60 * 10, // 10 minutes cache time
  });
}

export function useApplicationDetailQuery(id?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.applications.detail(id || ''),
    queryFn: () => applicationsService.fetchApplicationById(id!),
    enabled: Boolean(user && id),
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
    onMutate: async (newValues) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.applications.lists() });
      const previousApplications = queryClient.getQueryData<DbApplication[]>(queryKeys.applications.lists());

      if (previousApplications && user?.id) {
        const optimisticApp: DbApplication = {
          id: `temp-${Date.now()}`,
          user_id: user.id,
          company_id: newValues.company_id ?? null,
          company_name: newValues.company_name,
          position: newValues.position,
          location: newValues.location ?? null,
          work_type: newValues.work_type ?? null,
          salary: newValues.salary ?? null,
          status: newValues.status,
          applied_date: newValues.applied_date ?? new Date().toISOString(),
          notes_count: newValues.notes_count ?? 0,
          target_role: newValues.target_role ?? null,
          priority: newValues.priority ?? 'Orta',
          job_url: newValues.job_url ?? null,
          contact_name: newValues.contact_name ?? null,
          contact_email: newValues.contact_email ?? null,
          notes: newValues.notes ?? null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        queryClient.setQueryData<DbApplication[]>(
          queryKeys.applications.lists(),
          [optimisticApp, ...previousApplications]
        );
      }

      return { previousApplications };
    },
    onError: (error: Error, _variables, context) => {
      if (context?.previousApplications) {
        queryClient.setQueryData(queryKeys.applications.lists(), context.previousApplications);
      }
      toast.error('İşlem Başarısız', error.message || 'Başvuru eklenirken bir sorun oluştu.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
    },
    onSuccess: () => {
      toast.success('Başvuru Oluşturuldu', 'Yeni iş başvurusu başarıyla veritabanına eklendi.');
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

export function useBulkUpdateStatusMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: ApplicationStatus }) =>
      applicationsService.bulkUpdateStatus(ids, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
      toast.success(
        'Toplu Durum Güncellendi',
        `${variables.ids.length} iş başvurusunun durumu başarıyla güncellendi.`
      );
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message || 'Başvurular güncellenirken sorun oluştu.');
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

export function useBulkDeleteMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: string[]) => applicationsService.bulkDelete(ids),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
      toast.success(
        'Toplu Silme Başarılı',
        `${variables.length} iş başvurusu veritabanından kalıcı olarak silindi.`
      );
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message || 'Başvurular silinirken sorun oluştu.');
    },
  });
}

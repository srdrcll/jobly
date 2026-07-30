import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { companiesService } from '@/services/companiesService';
import { CompanyFormValues } from '@/lib/validations/companySchema';
import { DbCompanyUpdate } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useCompaniesListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.companies.lists(),
    queryFn: () => companiesService.fetchCompanies(),
    enabled: Boolean(user),
  });
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: CompanyFormValues) => {
      if (!user?.id) throw new Error('Oturum açmış kullanıcı bulunamadı.');
      return companiesService.createCompany(user.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() });
      toast.success('Şirket Kaydedildi', 'Hedef şirket listenize eklendi.');
    },
    onError: (error: Error) => {
      toast.error('İşlem Başarısız', error.message || 'Şirket eklenirken sorun oluştu.');
    },
  });
}

export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DbCompanyUpdate }) =>
      companiesService.updateCompany(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.detail(variables.id) });
      toast.success('Şirket Güncellendi', 'Şirket detayları kaydedildi.');
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message);
    },
  });
}

export function useDeleteCompanyMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => companiesService.deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() });
      toast.success('Şirket Silindi', 'Şirket kaydı kaldırıldı.');
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message);
    },
  });
}

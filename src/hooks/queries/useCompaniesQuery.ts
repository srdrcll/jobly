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
    staleTime: 1000 * 60 * 2, // 2 minutes stale time
    gcTime: 1000 * 60 * 10, // 10 minutes cache time
  });
}

export function useCompanyDetailQuery(id?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.companies.detail(id || ''),
    queryFn: () => companiesService.fetchCompanyById(id!),
    enabled: Boolean(user && id),
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

export function useToggleCompanyFavoriteMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, currentStatus }: { id: string; currentStatus: boolean }) =>
      companiesService.toggleFavorite(id, currentStatus),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.detail(variables.id) });
      toast.success(
        variables.currentStatus ? 'Favorilerden Çıkarıldı' : 'Favorilere Eklendi',
        'Şirket takibi güncellendi.'
      );
    },
    onError: (error: Error) => {
      toast.error('Favori Durumu Değiştirilemedi', error.message);
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

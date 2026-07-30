import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { templatesService } from '@/services/templatesService';
import { TemplateFormValues } from '@/lib/validations/templateSchema';
import { DbTemplateUpdate } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useTemplatesListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.templates.lists(),
    queryFn: () => templatesService.fetchTemplates(),
    enabled: Boolean(user),
  });
}

export function useCreateTemplateMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: TemplateFormValues) => {
      if (!user?.id) throw new Error('Oturum açmış kullanıcı bulunamadı.');
      return templatesService.createTemplate(user.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.lists() });
      toast.success('Şablon Oluşturuldu', 'Yeni belge şablonu kütüphanenize eklendi.');
    },
    onError: (error: Error) => {
      toast.error('İşlem Başarısız', error.message);
    },
  });
}

export function useUpdateTemplateMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DbTemplateUpdate }) =>
      templatesService.updateTemplate(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.detail(variables.id) });
      toast.success('Şablon Güncellendi', 'Şablon bilgileri başarıyla güncellendi.');
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message);
    },
  });
}

export function useDeleteTemplateMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => templatesService.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.lists() });
      toast.success('Şablon Silindi', 'Şablon kütüphanenizden kaldırıldı.');
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message);
    },
  });
}

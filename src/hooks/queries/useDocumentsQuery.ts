import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { documentsService } from '@/services/documentsService';
import { DocumentFormValues } from '@/lib/validations/documentSchema';
import { DbDocumentUpdate } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function useDocumentsListQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: queryKeys.documents.lists(),
    queryFn: () => documentsService.fetchDocuments(),
    enabled: Boolean(user),
  });
}

export function useCreateDocumentMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: DocumentFormValues) => {
      if (!user?.id) throw new Error('Oturum açmış kullanıcı bulunamadı.');
      return documentsService.createDocument(user.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.lists() });
      toast.success('Belge Kaydedildi', 'Dosya kaydı veritabanına eklendi.');
    },
    onError: (error: Error) => {
      toast.error('İşlem Başarısız', error.message);
    },
  });
}

export function useUpdateDocumentMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DbDocumentUpdate }) =>
      documentsService.updateDocument(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.lists() });
      toast.success('Belge Güncellendi', 'Belge bilgileri başarıyla kaydedildi.');
    },
    onError: (error: Error) => {
      toast.error('Güncelleme Başarısız', error.message);
    },
  });
}

export function useDeleteDocumentMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => documentsService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.lists() });
      toast.success('Belge Silindi', 'Dosya kaydı veritabanından kaldırıldı.');
    },
    onError: (error: Error) => {
      toast.error('Silme Başarısız', error.message);
    },
  });
}

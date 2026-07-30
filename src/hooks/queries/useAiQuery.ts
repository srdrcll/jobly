import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { aiService } from '@/services/aiService';
import { AiCategory, AiSettings } from '@/types/ai';
import { useToast } from '@/hooks/useToast';

export function useAiConversationsQuery() {
  return useQuery({
    queryKey: queryKeys.ai.conversations(),
    queryFn: () => aiService.getConversations(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useAiConversationDetailQuery(id?: string) {
  return useQuery({
    queryKey: queryKeys.ai.conversation(id || ''),
    queryFn: () => (id ? aiService.getConversationById(id) : null),
    enabled: Boolean(id),
  });
}

export function useCreateAiConversationMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ title, category, initialMessage }: { title: string; category: AiCategory; initialMessage?: string }) =>
      aiService.createConversation(title, category, initialMessage),
    onSuccess: (newConv) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() });
      toast.success('Sohbet Başlatıldı', `"${newConv.title}" sohbeti açıldı.`);
    },
  });
}

export function useRenameAiConversationMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, newTitle }: { id: string; newTitle: string }) =>
      aiService.renameConversation(id, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() });
      toast.success('Sohbet Yeniden Adlandırıldı');
    },
  });
}

export function useToggleAiFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => aiService.toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() });
    },
  });
}

export function useDeleteAiConversationMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => aiService.deleteConversation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() });
      toast.success('Sohbet Silindi');
    },
  });
}

export function useSendAiMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, message }: { conversationId: string; message: string }) =>
      aiService.sendMessage(conversationId, message),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversation(variables.conversationId) });
    },
  });
}

export function useAiSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.ai.settings(),
    queryFn: () => aiService.getSettings(),
  });
}

export function useUpdateAiSettingsMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (settings: AiSettings) => aiService.saveSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.settings() });
      toast.success('Yapay Zekâ Tercihleri Kaydedildi');
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { aiReviewService } from '@/services/aiReviewService';
import { useToast } from '@/hooks/useToast';

export function useResumeReviewsQuery() {
  return useQuery({
    queryKey: queryKeys.aiReview.resumes(),
    queryFn: () => aiReviewService.getResumeReviews(),
  });
}

export function useCoverLetterReviewsQuery() {
  return useQuery({
    queryKey: queryKeys.aiReview.coverLetters(),
    queryFn: () => aiReviewService.getCoverLetterReviews(),
  });
}

export function useReviewResumeMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ fileName, contentText }: { fileName: string; contentText: string }) =>
      aiReviewService.reviewResume(fileName, contentText),
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiReview.resumes() });
      toast.success('Özgeçmiş Analizi Tamamlandı', `Skor: ${record.overallScore}/100`);
    },
    onError: (error: Error) => {
      toast.error('Analiz Başarısız', error.message);
    },
  });
}

export function useReviewCoverLetterMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ title, contentText }: { title: string; contentText: string }) =>
      aiReviewService.reviewCoverLetter(title, contentText),
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiReview.coverLetters() });
      toast.success('Ön Mektup Analizi Tamamlandı', `Skor: ${record.overallScore}/100`);
    },
    onError: (error: Error) => {
      toast.error('Analiz Başarısız', error.message);
    },
  });
}

export function useDeleteResumeReviewMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => aiReviewService.deleteResumeReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiReview.resumes() });
      toast.success('Özgeçmiş Analizi Silindi');
    },
  });
}

export function useDeleteCoverLetterReviewMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => aiReviewService.deleteCoverLetterReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiReview.coverLetters() });
      toast.success('Ön Mektup Analizi Silindi');
    },
  });
}

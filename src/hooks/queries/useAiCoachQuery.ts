import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { aiCoachService } from '@/services/aiCoachService';
import { SeniorityLevel, CareerGoal } from '@/types/aiCoach';
import { useToast } from '@/hooks/useToast';

export function useAiCoachSessionsQuery() {
  return useQuery({
    queryKey: queryKeys.aiCoach.sessions(),
    queryFn: () => aiCoachService.getSessions(),
  });
}

export function useAiCareerGoalsQuery() {
  return useQuery({
    queryKey: queryKeys.aiCoach.goals(),
    queryFn: () => aiCoachService.getGoals(),
  });
}

export function useGenerateCoachSessionMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      companyName,
      position,
      interviewType,
      seniority,
    }: {
      companyName: string;
      position: string;
      interviewType: string;
      seniority: SeniorityLevel;
    }) => aiCoachService.generateSession(companyName, position, interviewType, seniority),
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiCoach.sessions() });
      toast.success('Mülakat Simülasyonu Hazır', `${session.position} için 6 kilit soru oluşturuldu.`);
    },
  });
}

export function useEvaluateAnswerMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ questionText, userAnswerText }: { questionText: string; userAnswerText: string }) =>
      aiCoachService.evaluateAnswer(questionText, userAnswerText),
    onSuccess: (evalRes) => {
      toast.success('Yanıt Değerlendirildi', `Performans Skoru: ${evalRes.score}/100`);
    },
  });
}

export function useCreateCareerGoalMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (goal: Omit<CareerGoal, 'id' | 'completed'>) => aiCoachService.createGoal(goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiCoach.goals() });
      toast.success('Kariyer Hedefi Oluşturuldu');
    },
  });
}

export function useToggleCareerGoalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => aiCoachService.toggleGoalCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiCoach.goals() });
    },
  });
}

export function useDeleteCareerGoalMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => aiCoachService.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aiCoach.goals() });
      toast.success('Kariyer Hedefi Silindi');
    },
  });
}

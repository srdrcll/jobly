import { aiCoachProvider } from './aiCoachProvider';
import { aiCoachRepository } from '@/repositories/aiCoachRepository';
import { 
  CoachSession, 
  SeniorityLevel, 
  AnswerEvaluation, 
  CareerGoal 
} from '@/types/aiCoach';

export const aiCoachService = {
  async generateSession(
    companyName: string,
    position: string,
    interviewType: string,
    seniority: SeniorityLevel
  ): Promise<CoachSession> {
    const session = await aiCoachProvider.generateCoachSession(companyName, position, interviewType, seniority);
    aiCoachRepository.saveSession(session);
    return session;
  },

  getSessions(): CoachSession[] {
    return aiCoachRepository.getSessions();
  },

  deleteSession(id: string): void {
    aiCoachRepository.deleteSession(id);
  },

  async evaluateAnswer(questionText: string, userAnswerText: string): Promise<AnswerEvaluation> {
    return await aiCoachProvider.evaluateUserAnswer(questionText, userAnswerText);
  },

  getGoals(): CareerGoal[] {
    return aiCoachRepository.getGoals();
  },

  createGoal(goal: Omit<CareerGoal, 'id' | 'completed'>): CareerGoal {
    return aiCoachRepository.saveGoal(goal);
  },

  toggleGoalCompleted(id: string): void {
    aiCoachRepository.toggleGoalCompleted(id);
  },

  deleteGoal(id: string): void {
    aiCoachRepository.deleteGoal(id);
  },
};

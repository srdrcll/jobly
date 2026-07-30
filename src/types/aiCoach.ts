export type SeniorityLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Lead / Principal';

export type CoachQuestionCategory = 
  | 'Technical' 
  | 'Behavioral' 
  | 'Company-Specific' 
  | 'Role-Specific' 
  | 'HR' 
  | 'Follow-up';

export interface AnswerEvaluation {
  score: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  suggestedImprovements: string[];
  exampleBetterAnswer: string;
}

export interface CoachQuestion {
  id: string;
  category: CoachQuestionCategory;
  questionText: string;
  sampleAnswer: string;
  userAnswer?: string;
  evaluation?: AnswerEvaluation;
}

export interface CoachSession {
  id: string;
  companyName: string;
  position: string;
  interviewType: string;
  seniority: SeniorityLevel;
  questions: CoachQuestion[];
  createdAt: string;
}

export interface CareerGoal {
  id: string;
  title: string;
  targetCount: number;
  currentProgress: number;
  category: 'applications' | 'interviews' | 'offers' | 'success_rate';
  targetDate: string;
  completed: boolean;
}

export interface IAiCoachProvider {
  generateCoachSession(
    companyName: string, 
    position: string, 
    interviewType: string, 
    seniority: SeniorityLevel
  ): Promise<CoachSession>;
  
  evaluateUserAnswer(questionText: string, userAnswerText: string): Promise<AnswerEvaluation>;
}

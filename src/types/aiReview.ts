export type ReviewStatus = 'excellent' | 'good' | 'needs_improvement' | 'critical';

export interface SectionAnalysis {
  sectionName: 'Contact Information' | 'Summary' | 'Experience' | 'Education' | 'Skills' | 'Projects' | 'Certifications' | string;
  score: number; // 0-100
  status: ReviewStatus;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface CategorizedSuggestions {
  criticalIssues: string[];
  improvements: string[];
  strengths: string[];
  recommendedChanges: string[];
}

export interface ResumeReviewRecord {
  id: string;
  fileName: string;
  version: number;
  overallScore: number; // 0-100
  sections: SectionAnalysis[];
  suggestions: CategorizedSuggestions;
  createdAt: string;
  fileContentText?: string;
}

export interface CoverLetterReviewRecord {
  id: string;
  title: string;
  version: number;
  overallScore: number; // 0-100
  grammarScore: number; // 0-100
  clarityScore: number; // 0-100
  toneScore: number; // 0-100
  personalizationScore: number; // 0-100
  atsScore: number; // 0-100
  structureScore: number; // 0-100
  suggestions: CategorizedSuggestions;
  createdAt: string;
  content: string;
}

/**
 * AI Provider Interface Abstraction (Ready for live LLM API Integration)
 */
export interface IAiReviewProvider {
  reviewResume(fileName: string, contentText: string): Promise<ResumeReviewRecord>;
  reviewCoverLetter(title: string, contentText: string): Promise<CoverLetterReviewRecord>;
}

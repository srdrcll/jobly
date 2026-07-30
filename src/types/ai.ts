export type AiCategory = 
  | 'resume' 
  | 'cover_letter' 
  | 'interview_prep' 
  | 'career_advice' 
  | 'strategy' 
  | 'salary' 
  | 'linkedin' 
  | 'general';

export interface AiMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  category?: AiCategory;
}

export interface AiConversation {
  id: string;
  title: string;
  category: AiCategory;
  isFavorite: boolean;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
  messages: AiMessage[];
}

export interface AiSettings {
  model: 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'claude-3.5-sonnet' | 'gpt-4o';
  persona: 'HR Manager' | 'Tech Lead' | 'Career Coach' | 'Executive Recruiter';
  creativity: number;
  responseLength: 'concise' | 'balanced' | 'detailed';
}

export interface SuggestedPrompt {
  id: string;
  category: AiCategory;
  title: string;
  prompt: string;
  iconName: string;
  tag: string;
}

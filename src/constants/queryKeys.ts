export const queryKeys = {
  applications: {
    all: ['applications'] as const,
    lists: () => [...queryKeys.applications.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.applications.lists(), filters] as const,
    details: () => [...queryKeys.applications.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.applications.details(), id] as const,
  },
  companies: {
    all: ['companies'] as const,
    lists: () => [...queryKeys.companies.all, 'list'] as const,
    list: (search?: string) => [...queryKeys.companies.lists(), { search }] as const,
    detail: (id: string) => [...queryKeys.companies.all, 'detail', id] as const,
  },
  templates: {
    all: ['templates'] as const,
    lists: () => [...queryKeys.templates.all, 'list'] as const,
    list: (category?: string) => [...queryKeys.templates.lists(), { category }] as const,
    detail: (id: string) => [...queryKeys.templates.all, 'detail', id] as const,
  },
  reminders: {
    all: ['reminders'] as const,
    lists: () => [...queryKeys.reminders.all, 'list'] as const,
    byApplication: (appId: string) => [...queryKeys.reminders.all, 'application', appId] as const,
  },
  documents: {
    all: ['documents'] as const,
    lists: () => [...queryKeys.documents.all, 'list'] as const,
    byApplication: (appId: string) => [...queryKeys.documents.all, 'application', appId] as const,
  },
  interviews: {
    all: ['interviews'] as const,
    lists: () => [...queryKeys.interviews.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.interviews.lists(), filters] as const,
    details: () => [...queryKeys.interviews.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.interviews.details(), id] as const,
  },
  ai: {
    all: ['ai'] as const,
    conversations: () => [...queryKeys.ai.all, 'conversations'] as const,
    conversation: (id: string) => [...queryKeys.ai.conversations(), id] as const,
    settings: () => [...queryKeys.ai.all, 'settings'] as const,
  },
  aiReview: {
    all: ['aiReview'] as const,
    resumes: () => [...queryKeys.aiReview.all, 'resumes'] as const,
    resume: (id: string) => [...queryKeys.aiReview.resumes(), id] as const,
    coverLetters: () => [...queryKeys.aiReview.all, 'coverLetters'] as const,
    coverLetter: (id: string) => [...queryKeys.aiReview.coverLetters(), id] as const,
  },
};

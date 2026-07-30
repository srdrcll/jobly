import { ResumeReviewRecord, CoverLetterReviewRecord } from '@/types/aiReview';

const RESUME_REVIEWS_KEY = 'kp_ai_resume_reviews_v1';
const COVER_REVIEWS_KEY = 'kp_ai_cover_reviews_v1';

export const aiReviewRepository = {
  getResumeReviews(): ResumeReviewRecord[] {
    try {
      const raw = localStorage.getItem(RESUME_REVIEWS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveResumeReview(review: ResumeReviewRecord): void {
    try {
      const list = this.getResumeReviews();
      // Auto-increment version if same fileName exists
      const existingSameFile = list.filter((r) => r.fileName === review.fileName);
      review.version = existingSameFile.length + 1;

      list.unshift(review);
      localStorage.setItem(RESUME_REVIEWS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save resume review', e);
    }
  },

  deleteResumeReview(id: string): void {
    const list = this.getResumeReviews();
    const filtered = list.filter((r) => r.id !== id);
    localStorage.setItem(RESUME_REVIEWS_KEY, JSON.stringify(filtered));
  },

  getCoverLetterReviews(): CoverLetterReviewRecord[] {
    try {
      const raw = localStorage.getItem(COVER_REVIEWS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveCoverLetterReview(review: CoverLetterReviewRecord): void {
    try {
      const list = this.getCoverLetterReviews();
      const existingSameTitle = list.filter((r) => r.title === review.title);
      review.version = existingSameTitle.length + 1;

      list.unshift(review);
      localStorage.setItem(COVER_REVIEWS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save cover letter review', e);
    }
  },

  deleteCoverLetterReview(id: string): void {
    const list = this.getCoverLetterReviews();
    const filtered = list.filter((r) => r.id !== id);
    localStorage.setItem(COVER_REVIEWS_KEY, JSON.stringify(filtered));
  },
};

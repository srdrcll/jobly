import { aiReviewProvider } from './aiReviewProvider';
import { aiReviewRepository } from '@/repositories/aiReviewRepository';
import { ResumeReviewRecord, CoverLetterReviewRecord } from '@/types/aiReview';

export const aiReviewService = {
  async reviewResume(fileName: string, contentText: string): Promise<ResumeReviewRecord> {
    const review = await aiReviewProvider.reviewResume(fileName, contentText);
    aiReviewRepository.saveResumeReview(review);
    return review;
  },

  getResumeReviews(): ResumeReviewRecord[] {
    return aiReviewRepository.getResumeReviews();
  },

  deleteResumeReview(id: string): void {
    aiReviewRepository.deleteResumeReview(id);
  },

  async reviewCoverLetter(title: string, contentText: string): Promise<CoverLetterReviewRecord> {
    const review = await aiReviewProvider.reviewCoverLetter(title, contentText);
    aiReviewRepository.saveCoverLetterReview(review);
    return review;
  },

  getCoverLetterReviews(): CoverLetterReviewRecord[] {
    return aiReviewRepository.getCoverLetterReviews();
  },

  deleteCoverLetterReview(id: string): void {
    aiReviewRepository.deleteCoverLetterReview(id);
  },
};

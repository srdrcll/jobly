import { test, expect } from '@playwright/test';
import { InterviewsPageObject } from './pages/InterviewsPage';

test.describe('E2E Journey: Interviews Module', () => {
  test('redirects unauthenticated user accessing /interviews to /login', async ({ page }) => {
    const intPage = new InterviewsPageObject(page);
    await intPage.goto();
    await expect(page).toHaveURL(/\/login/);
  });
});

import { test, expect } from '@playwright/test';
import { ApplicationsPageObject } from './pages/ApplicationsPage';

test.describe('E2E Journey: Applications Module', () => {
  test('redirects unauthenticated user accessing /applications to /login', async ({ page }) => {
    const appsPage = new ApplicationsPageObject(page);
    await appsPage.goto();
    await expect(page).toHaveURL(/\/login/);
  });
});

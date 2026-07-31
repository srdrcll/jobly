import { test, expect } from '@playwright/test';
import { CompaniesPageObject } from './pages/CompaniesPage';

test.describe('E2E Journey: Companies Module', () => {
  test('redirects unauthenticated user accessing /companies to /login', async ({ page }) => {
    const compPage = new CompaniesPageObject(page);
    await compPage.goto();
    await expect(page).toHaveURL(/\/login/);
  });
});

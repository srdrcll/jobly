import { test, expect } from '@playwright/test';
import { LoginPageObject } from './pages/LoginPage';

test.describe('E2E Journey: Authentication Module', () => {
  test('redirects unauthenticated user accessing /dashboard to /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
    const loginPage = new LoginPageObject(page);
    await expect(loginPage.heading).toBeVisible();
  });

  test('displays registration form elements on /register', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /hesap oluşturun/i })).toBeVisible();
    await expect(page.getByLabel(/ad soyad/i)).toBeVisible();
    await expect(page.getByLabel(/e-posta adresi/i)).toBeVisible();
  });
});

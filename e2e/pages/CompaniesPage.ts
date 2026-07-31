import { Page, Locator } from '@playwright/test';

export class CompaniesPageObject {
  readonly page: Page;
  readonly heading: Locator;
  readonly newCompanyButton: Locator;
  readonly searchInput: Locator;
  readonly companyNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /hedef şirketler/i });
    this.newCompanyButton = page.getByRole('button', { name: /yeni şirket/i });
    this.searchInput = page.getByPlaceholder(/şirket adı, sektör veya lokasyon ara/i);
    this.companyNameInput = page.getByLabel(/şirket adı \*/i);
    this.saveButton = page.getByRole('button', { name: /şirketi kaydet/i });
  }

  async goto() {
    await this.page.goto('/companies');
  }

  async createCompany(name: string) {
    await this.newCompanyButton.click();
    await this.companyNameInput.fill(name);
    await this.saveButton.click();
  }
}

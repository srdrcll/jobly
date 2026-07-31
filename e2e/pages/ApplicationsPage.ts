import { Page, Locator } from '@playwright/test';

export class ApplicationsPageObject {
  readonly page: Page;
  readonly heading: Locator;
  readonly newApplicationButton: Locator;
  readonly searchInput: Locator;
  readonly companyNameInput: Locator;
  readonly positionInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /iş başvurularım/i });
    this.newApplicationButton = page.getByRole('button', { name: /yeni başvuru/i });
    this.searchInput = page.getByPlaceholder(/şirket, pozisyon veya not ara/i);
    this.companyNameInput = page.getByLabel(/şirket adı \*/i);
    this.positionInput = page.getByLabel(/pozisyon ünvanı \*/i);
    this.saveButton = page.getByRole('button', { name: /başvuruyu kaydet/i });
  }

  async goto() {
    await this.page.goto('/applications');
  }

  async openCreateModal() {
    await this.newApplicationButton.click();
  }

  async createApplication(company: string, position: string) {
    await this.openCreateModal();
    await this.companyNameInput.fill(company);
    await this.positionInput.fill(position);
    await this.saveButton.click();
  }
}

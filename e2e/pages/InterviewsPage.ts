import { Page, Locator } from '@playwright/test';

export class InterviewsPageObject {
  readonly page: Page;
  readonly heading: Locator;
  readonly newInterviewButton: Locator;
  readonly companyNameInput: Locator;
  readonly positionInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /mülakat yönetimi & takvim/i });
    this.newInterviewButton = page.getByRole('button', { name: /yeni mülakat planla/i });
    this.companyNameInput = page.getByLabel(/şirket adı \*/i);
    this.positionInput = page.getByLabel(/pozisyon adı \*/i);
    this.saveButton = page.getByRole('button', { name: /mülakatı kaydet/i });
  }

  async goto() {
    await this.page.goto('/interviews');
  }

  async scheduleInterview(company: string, position: string) {
    await this.newInterviewButton.click();
    await this.companyNameInput.fill(company);
    await this.positionInput.fill(position);
    await this.saveButton.click();
  }
}

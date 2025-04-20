import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button');
    this.resultText = page.locator('#result');
  }

  async goto() {
    await this.page.goto('http://localhost:54587/index.html');
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getResultText(): Promise<string> {
    return (await this.resultText.textContent()) ?? '';
  }
}
// Page Object Model for the Radio Button page at DemoQA
import { Page, Locator } from '@playwright/test';

export class RadioButtonPage {
  readonly page: Page;
  readonly yesRadio: Locator;
  readonly impressiveRadio: Locator;
  readonly noRadio: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yesRadio = page.locator('label[for="yesRadio"]');
    this.impressiveRadio = page.locator('label[for="impressiveRadio"]');
    this.noRadio = page.locator('label[for="noRadio"]');
    this.result = page.locator('.text-success');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/radio-button');
  }

  async selectYes() {
    await this.yesRadio.click();
  }

  async selectImpressive() {
    await this.impressiveRadio.click();
  }

  async selectNo() {
    await this.noRadio.click();
  }

  async getResultText() {
    return await this.result.textContent();
  }
}

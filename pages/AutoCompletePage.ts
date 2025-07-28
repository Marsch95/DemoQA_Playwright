// Page Object Model for the Auto Complete page at DemoQA
import { Page, Locator } from '@playwright/test';

export class AutoCompletePage {
  readonly page: Page;
  readonly singleInput: Locator;
  readonly multiInput: Locator;
  readonly singleValue: Locator;
  readonly multiValues: Locator;

  constructor(page: Page) {
    this.page = page;
    this.singleInput = page.locator('#autoCompleteSingleInput');
    this.multiInput = page.locator('#autoCompleteMultipleInput');
    this.singleValue = page.locator('.auto-complete__single-value');
    this.multiValues = page.locator('.auto-complete__multi-value__label');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/auto-complete');
  }

  async fillSingleColor(color: string) {
    await this.singleInput.fill(color);
    await this.singleInput.press('Enter');
  }

  async fillMultipleColors(colors: string[]) {
    for (const color of colors) {
      //await this.multiInput.click(); // Ensure input is focused
      await this.multiInput.fill(color);
      await this.multiInput.press('Enter');
    }
  }

  async getSingleColor(): Promise<string> {
    return await this.singleValue.innerText();
  }

  async getMultipleColors(): Promise<string[]> {
    const count = await this.multiValues.count();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      values.push(await this.multiValues.nth(i).innerText());
    }
    return values;
  }
}

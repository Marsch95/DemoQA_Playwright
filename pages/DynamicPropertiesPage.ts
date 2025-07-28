// Page Object Model for the Dynamic Properties page at DemoQA
import { Page, Locator } from '@playwright/test';

export class DynamicPropertiesPage {
  readonly page: Page;
  readonly enableAfterButton: Locator;
  readonly colorChangeButton: Locator;
  readonly visibleAfterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enableAfterButton = page.locator('#enableAfter');
    this.colorChangeButton = page.locator('#colorChange');
    this.visibleAfterButton = page.locator('#visibleAfter');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/dynamic-properties');
  }

  async waitForEnableAfter() {
    // Wait until the button is visible, then check if it's enabled
    await this.enableAfterButton.waitFor({ state: 'visible', timeout: 7000 });
    await this.page.waitForFunction(
      (el) => el && !el.hasAttribute('disabled'),
      await this.enableAfterButton.elementHandle(),
      { timeout: 7000 }
    );
  }

  async waitForVisibleAfter() {
    await this.visibleAfterButton.waitFor({ state: 'visible', timeout: 7000 });
  }

  async getColorChangeButtonColor(): Promise<string> {
    return await this.colorChangeButton.evaluate((el: HTMLElement) => getComputedStyle(el).color);
  }
}

// Page Object Model for the Browser Windows page at DemoQA
import { Page, Locator } from '@playwright/test';

export class BrowserWindowsPage {
  readonly page: Page;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly newWindowMsgButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabButton = page.locator('#tabButton');
    this.newWindowButton = page.locator('#windowButton');
    this.newWindowMsgButton = page.locator('#messageWindowButton');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/browser-windows');
  }

  async clickNewTab() {
    await this.newTabButton.click();
  }

  async clickNewWindow() {
    await this.newWindowButton.click();
  }

  async clickNewWindowMsg() {
    await this.newWindowMsgButton.click();
  }
}

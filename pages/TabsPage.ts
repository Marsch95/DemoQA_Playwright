// Page Object Model for the Tabs page at DemoQA
import { Page, Locator } from '@playwright/test';

export class TabsPage {
  readonly page: Page;
  readonly tabWhat: Locator;
  readonly tabOrigin: Locator;
  readonly tabUse: Locator;
  readonly tabMore: Locator;
  readonly tabContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabWhat = page.locator('#demo-tab-what');
    this.tabOrigin = page.locator('#demo-tab-origin');
    this.tabUse = page.locator('#demo-tab-use');
    this.tabMore = page.locator('#demo-tab-more');
    this.tabContent = page.locator('.tab-pane.active');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/tabs');
  }

  async clickTab(tab: Locator) {
    await tab.click();
  }

  async getActiveTabContent(): Promise<string> {
    // Returns the text of the currently active tab content
    return (await this.tabContent.textContent()) ?? '';
  }

  async getMoreTabDisabled(): Promise<boolean> {
    // Check if the More tab is disabled
    return await this.tabMore.getAttribute('aria-disabled') === 'true';
  }
}

// Page Object Model for the Tool Tips page at DemoQA
import { Page, Locator } from '@playwright/test';

export class ToolTipsPage {
  readonly page: Page;
  readonly button: Locator;
  readonly textField: Locator;
  readonly tooltip: Locator;
  readonly linkContrary: Locator;
  readonly linkVersion: Locator;
  readonly section: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.locator('#toolTipButton');
    this.textField = page.locator('#toolTipTextField');
    // Use getByRole to target specific links by name for strict matching
    this.linkContrary = page.getByRole('link', { name: 'Contrary' });
    this.linkVersion = page.getByRole('link', { name: '1.10.32' });
    this.section = page.locator('#texToolTopContainer');
    this.tooltip = page.locator('.tooltip-inner');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/tool-tips');
  }

  async hoverElement(element: Locator) {
    await element.hover();
  }

  async getTooltipText(): Promise<string> {
    // Wait for tooltip to appear and return its text
    await this.tooltip.waitFor({ state: 'visible' });
    return (await this.tooltip.textContent()) ?? '';
  }
}

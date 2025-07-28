// Page Object Model for the Check Box page at DemoQA
import { Page, Locator } from '@playwright/test';

export class CheckBoxPage {
  readonly page: Page;
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly homeCheckbox: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expandAllButton = page.locator('.rct-option-expand-all');
    this.collapseAllButton = page.locator('.rct-option-collapse-all');
    this.homeCheckbox = page.locator('label[for="tree-node-home"] span.rct-checkbox');
    this.result = page.locator('#result');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/checkbox');
  }

  async expandAll() {
    await this.expandAllButton.click();
  }

  async collapseAll() {
    await this.collapseAllButton.click();
  }

  async checkHome() {
    await this.homeCheckbox.click();
  }

  async getResultText() {
    return await this.result.textContent();
  }

  /**
   * Expands a tree node by its visible text label
   * @param nodeName The name of the node to expand (e.g., 'Documents', 'WorkSpace', 'Office')
   */
  async expandNode(nodeName: string) {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: new RegExp(`^${nodeName}$`) })
      .getByLabel('Toggle')
      .click();
  }
}

// Page Object Model for the Menu page at DemoQA
import { Page } from '@playwright/test';

export class MenuPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoqa.com/menu');
  }

  async hoverMenuItem(itemText: string) {
    // Hover over a menu item by its visible text
    await this.page.getByRole('link', { name: itemText }).hover();
  }

  async isMenuItemVisible(itemText: string): Promise<boolean> {
    // Check if a menu item is visible by its text
    return await this.page.getByRole('link', { name: itemText }).first().isVisible();
  }
}

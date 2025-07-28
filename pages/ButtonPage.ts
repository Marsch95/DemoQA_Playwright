// Page Object Model for the Buttons page at DemoQA
import { Page, Locator } from '@playwright/test';

export class ButtonPage {
  readonly page: Page;
  readonly doubleClickBtn: Locator;
  readonly rightClickBtn: Locator;
  readonly clickMeBtn: Locator;
  readonly doubleClickMsg: Locator;
  readonly rightClickMsg: Locator;
  readonly clickMeMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.doubleClickBtn = page.locator('#doubleClickBtn');
    this.rightClickBtn = page.locator('#rightClickBtn');
    this.clickMeBtn = page.getByRole('button', { name: 'Click Me', exact: true });
    this.doubleClickMsg = page.locator('#doubleClickMessage');
    this.rightClickMsg = page.locator('#rightClickMessage');
    this.clickMeMsg = page.locator('#dynamicClickMessage');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/buttons');
  }

  async doubleClick() {
    await this.doubleClickBtn.dblclick();
  }

  async rightClick() {
    await this.rightClickBtn.click({ button: 'right' });
  }

  async clickMe() {
    await this.clickMeBtn.click();
  }

  async getDoubleClickMsg() {
    return await this.doubleClickMsg.textContent();
  }

  async getRightClickMsg() {
    return await this.rightClickMsg.textContent();
  }

  async getClickMeMsg() {
    return await this.clickMeMsg.textContent();
  }
}

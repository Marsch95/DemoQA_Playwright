// Page Object Model for the Modal Dialogs page at DemoQA
import { Page, Locator } from '@playwright/test';

export class ModalDialogsPage {
  readonly page: Page;
  readonly smallModalButton: Locator;
  readonly largeModalButton: Locator;
  readonly smallModal: Locator;
  readonly largeModal: Locator;
  readonly closeSmallModalButton: Locator;
  readonly closeLargeModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.smallModalButton = page.locator('#showSmallModal');
    this.largeModalButton = page.locator('#showLargeModal');
    this.smallModal = page.locator('.modal-content');
    this.largeModal = page.locator('.modal-content');
    this.closeSmallModalButton = page.locator('#closeSmallModal');
    this.closeLargeModalButton = page.locator('#closeLargeModal');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/modal-dialogs');
  }

  async openSmallModal() {
    await this.smallModalButton.click();
  }

  async openLargeModal() {
    await this.largeModalButton.click();
  }

  async getSmallModalText(): Promise<string> {
    return await this.smallModal.locator('.modal-body').innerText();
  }

  async getLargeModalText(): Promise<string> {
    return await this.largeModal.locator('.modal-body').innerText();
  }

  async closeSmallModal() {
    await this.closeSmallModalButton.click();
  }

  async closeLargeModal() {
    await this.closeLargeModalButton.click();
  }
}

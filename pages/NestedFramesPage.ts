// Page Object Model for the Nested Frames page at DemoQA
import { Page, FrameLocator } from '@playwright/test';

export class NestedFramesPage {
  readonly page: Page;
  readonly parentFrame: FrameLocator;
  readonly childFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.parentFrame = page.frameLocator('#frame1'); // Parent frame
    this.childFrame = this.parentFrame.frameLocator('iframe'); // Child frame inside parent
  }

  async goto() {
    await this.page.goto('https://demoqa.com/nestedframes');
  }

  async getParentFrameText(): Promise<string> {
    return await this.parentFrame.locator('body').innerText();
  }

  async getChildFrameText(): Promise<string> {
    return await this.childFrame.locator('p').innerText();
  }
}

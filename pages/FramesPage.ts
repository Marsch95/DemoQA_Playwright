// Page Object Model for the Frames page at DemoQA
import { Page, Locator, FrameLocator } from '@playwright/test';

export class FramesPage {
  readonly page: Page;
  readonly frame1: FrameLocator;
  readonly frame2: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frame1 = page.frameLocator('#frame1');
    this.frame2 = page.frameLocator('#frame2');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/frames');
  }

  async getFrame1Text(): Promise<string> {
    return await this.frame1.locator('h1#sampleHeading').innerText();
  }

  async getFrame2Text(): Promise<string> {
    return await this.frame2.locator('h1#sampleHeading').innerText();
  }
}

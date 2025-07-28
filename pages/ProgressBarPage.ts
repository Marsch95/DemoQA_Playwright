// Page Object Model for the Progress Bar page at DemoQA
import { Page, Locator } from '@playwright/test';

export class ProgressBarPage {
  readonly page: Page;
  readonly startButton: Locator;
  readonly resetButton: Locator;
  readonly progressBar: Locator;


  constructor(page: Page) {
    this.page = page;
    this.startButton = page.locator('#startStopButton');
    this.resetButton = page.locator('#resetButton');
    this.progressBar = page.locator('.progress-bar');
     }

  async goto() {
    await this.page.goto('https://demoqa.com/progress-bar');
  }

  async startProgress() {
    await this.startButton.click();
  }

  /**
   * Clicks the start/stop button to pause the progress bar.
   * The same button is used for both starting and stopping.
   */
  async stopProgress() {
    await this.startButton.click();
  }

  async resetProgress() {
    await this.resetButton.click();
  }

  async getProgressValue(): Promise<string> {
    // Return progress value as string, fallback to empty string if null
    return (await this.progressBar.textContent()) ?? '';
  }
}

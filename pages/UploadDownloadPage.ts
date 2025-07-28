// Page Object Model for the Upload and Download page at DemoQA
import { Page, Locator } from '@playwright/test';
import * as path from 'path';

export class UploadDownloadPage {
  readonly page: Page;
  readonly uploadInput: Locator;
  readonly uploadedFilePath: Locator;
  readonly downloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadInput = page.locator('#uploadFile');
    this.uploadedFilePath = page.locator('#uploadedFilePath');
    this.downloadButton = page.locator('#downloadButton');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/upload-download');
  }

  async uploadFile(filePath: string) {
    await this.uploadInput.setInputFiles(filePath);
  }

  async getUploadedFileName(): Promise<string | null> {
    return await this.uploadedFilePath.textContent();
  }

  async downloadFile() {
    // Clicks the download button; actual file verification may require extra setup
    await this.downloadButton.click();
  }
}

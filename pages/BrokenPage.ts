// Page Object Model for the Broken Links - Images page at DemoQA
import { Page, Locator } from '@playwright/test';

export class BrokenPage {
  readonly page: Page;
  readonly validImage: Locator;
  readonly brokenImage: Locator;
  readonly validLink: Locator;
  readonly brokenLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.validImage = page
      .locator('text=Valid image')
      .locator('..')
      .locator('img[src="/images/Toolsqa.jpg"]');
    this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
    this.validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
    this.brokenLink = page.getByRole('link', { name: 'Click Here for Broken Link' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/broken');
  }

  async isImageBroken(image: Locator): Promise<boolean> {
    // Checks if the image failed to load by evaluating naturalWidth
    return await image.evaluate((img: HTMLImageElement) => img.naturalWidth === 0);
  }

  async clickValidLink() {
    await this.validLink.click();
  }

  async clickBrokenLink() {
    await this.brokenLink.click();
  }
}

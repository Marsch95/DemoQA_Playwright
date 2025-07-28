// Page Object Model for the Slider page at DemoQA
import { Page, Locator } from '@playwright/test';

export class SliderPage {
  readonly page: Page;
  readonly slider: Locator;
  readonly sliderValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.slider = page.locator('.range-slider');
    this.sliderValue = page.locator('#sliderValue');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/slider');
  }

  /**
   * Set the slider to a specific value by sending keys
   * @param value number between 1 and 100
   */
  async setSliderValue(value: number) {
    await this.slider.focus();
    // Reset to minimum
    await this.slider.press('Home');
    // Move to desired value
    for (let i = 0; i < value; i++) {
      await this.slider.press('ArrowRight');
    }
  }

  async getSliderValue(): Promise<string> {
    return await this.sliderValue.inputValue();
  }
}

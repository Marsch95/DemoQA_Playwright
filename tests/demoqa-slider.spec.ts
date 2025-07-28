import { test, expect } from '@playwright/test';
import { SliderPage } from '../pages/SliderPage';

let sliderPage: SliderPage;

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => {
    sliderPage = new SliderPage(page);
    await sliderPage.goto();
  });

  test('set and verify slider value', async () => {
    const value = 75;
    await sliderPage.setSliderValue(value);
    expect(await sliderPage.getSliderValue()).toBe(value.toString());
  });

  test('set slider to minimum and maximum', async () => {
    await sliderPage.setSliderValue(0);
    expect(await sliderPage.getSliderValue()).toBe('0');
    await sliderPage.setSliderValue(100);
    expect(await sliderPage.getSliderValue()).toBe('100');
  });
});

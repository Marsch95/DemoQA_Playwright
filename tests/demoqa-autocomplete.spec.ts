import { test, expect } from '@playwright/test';
import { AutoCompletePage } from '../pages/AutoCompletePage';

let autoCompletePage: AutoCompletePage;

test.describe('Auto Complete', () => {
  test.beforeEach(async ({ page }) => {
    autoCompletePage = new AutoCompletePage(page);
    await autoCompletePage.goto();
  });

  test('fill and verify single color', async () => {
    await autoCompletePage.fillSingleColor('Red');
    expect(await autoCompletePage.getSingleColor()).toBe('Red');
  });

  test('fill and verify multiple colors', async () => {
    const colors = ['Green', 'Blue', 'Yellow'];
    await autoCompletePage.fillMultipleColors(colors);
    // Wait for all colors to appear in the selection to reduce flakiness
    await expect(autoCompletePage.multiValues).toHaveCount(colors.length);
    const selectedColors = await autoCompletePage.getMultipleColors();
    for (const color of colors) {
      expect(selectedColors).toContain(color);
    }
  });
});

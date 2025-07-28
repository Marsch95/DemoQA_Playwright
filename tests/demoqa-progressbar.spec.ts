import { test, expect } from '@playwright/test';
import { ProgressBarPage } from '../pages/ProgressBarPage';

let progressBarPage: ProgressBarPage;

test.describe('Progress Bar', () => {
  test.beforeEach(async ({ page }) => {
    progressBarPage = new ProgressBarPage(page);
    await progressBarPage.goto();
  });

  test('start and wait for progress to reach 100%', async () => {
    await progressBarPage.startProgress();
    await expect(progressBarPage.progressBar).toHaveText('100%', { timeout: 15000 });
    expect(await progressBarPage.getProgressValue()).toContain('100%');
  });

  test('reset progress bar', async () => {
    await progressBarPage.startProgress();
    await expect(progressBarPage.progressBar).toHaveText('100%', { timeout: 15000 });
    await progressBarPage.resetProgress();
    await expect(progressBarPage.progressBar).toHaveText('0%', { timeout: 5000 });
    expect(await progressBarPage.getProgressValue()).toContain('0%');
  });

  test('stop button pauses the progress bar', async () => {
    await progressBarPage.startProgress();
    // Wait briefly to let progress start
    await progressBarPage.page.waitForTimeout(1000);
    await progressBarPage.stopProgress();
    // Capture progress value after stopping
    const pausedValue = await progressBarPage.getProgressValue();
    // Wait to verify the value does not change
    await progressBarPage.page.waitForTimeout(2000);
    expect(await progressBarPage.getProgressValue()).toBe(pausedValue);
    // Optionally, check that progress is not at 0% or 100%
    expect(pausedValue).not.toBe('0%');
    expect(pausedValue).not.toBe('100%');
  });


});

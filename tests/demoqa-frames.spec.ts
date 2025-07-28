import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

let framesPage: FramesPage;

test.beforeEach(async ({ page }) => {
  framesPage = new FramesPage(page);
  await framesPage.goto();
});

test('Frames: verify text in Frame 1', async () => {
  const frame1Text = await framesPage.getFrame1Text();
  expect(frame1Text).toBe('This is a sample page');
});

test('Frames: verify text in Frame 2', async () => {
  const frame2Text = await framesPage.getFrame2Text();
  expect(frame2Text).toBe('This is a sample page');
});

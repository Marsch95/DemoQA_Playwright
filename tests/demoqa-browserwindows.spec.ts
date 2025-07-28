import { test, expect } from '@playwright/test';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';

// Test to interact with the Browser Windows page using POM

test('Browser Windows: open new tab and verify content', async ({ page, context }) => {
  const browserWindowsPage = new BrowserWindowsPage(page);
  await browserWindowsPage.goto();

  // Click the New Tab button and verify a new tab opens with expected content
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    browserWindowsPage.clickNewTab(),
  ]);
  await newTab.waitForLoadState();
  expect(newTab.url()).toContain('sample');
  await expect(newTab.locator('body')).toContainText('This is a sample page');
  await newTab.close();
});

test('Browser Windows: open new window and verify content', async ({ page, context }) => {
  const browserWindowsPage = new BrowserWindowsPage(page);
  await browserWindowsPage.goto();

  // Click the New Window button and verify a new window opens with expected content
  const [newWindow] = await Promise.all([
    context.waitForEvent('page'),
    browserWindowsPage.clickNewWindow(),
  ]);
  await newWindow.waitForLoadState();
  expect(newWindow.url()).toContain('sample');
  await expect(newWindow.locator('body')).toContainText('This is a sample page');
  await newWindow.close();
});

test('Browser Windows: open new message window and verify content', async ({ page, context }) => {
  const browserWindowsPage = new BrowserWindowsPage(page);
  await browserWindowsPage.goto();

  // Click the New Window Message button and verify a new window opens
  const [msgWindow] = await Promise.all([
    context.waitForEvent('page'),
    browserWindowsPage.clickNewWindowMsg(),
  ]);
  await msgWindow.waitForLoadState();
  // The message window may contain only text, so just check the body is not empty
  const bodyText = await msgWindow.locator('body').innerText();
  expect(bodyText.trim().length).toBeGreaterThan(0);
  await msgWindow.close();
});

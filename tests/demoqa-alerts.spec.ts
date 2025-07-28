import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

let alertsPage: AlertsPage;

test.beforeEach(async ({ page }) => {
  alertsPage = new AlertsPage(page);
  await alertsPage.goto();
});

// Test to interact with the Alerts page using POM

test('Alerts: handle simple alert', async ({ page }) => {
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('You clicked a button');
    await dialog.accept();
  });
  await alertsPage.clickAlertButton();
});

test('Alerts: handle timer alert', async ({ page }) => {
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('This alert appeared after 5 seconds');
    await dialog.accept();
  });
  await alertsPage.clickTimerAlertButton();
  // Wait for the alert to appear (handled by Playwright's dialog event)
});

test('Alerts: handle confirm alert (accept)', async ({ page }) => {
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Do you confirm action?');
    await dialog.accept();
  });
  await alertsPage.clickConfirmButton();
  await expect(page.locator('#confirmResult')).toContainText('You selected Ok');
});

test('Alerts: handle confirm alert (dismiss)', async ({ page }) => {
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Do you confirm action?');
    await dialog.dismiss();
  });
  await alertsPage.clickConfirmButton();
  await expect(page.locator('#confirmResult')).toContainText('You selected Cancel');
});

test('Alerts: handle prompt alert', async ({ page }) => {
  const promptInput = 'Playwright Test';
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('Please enter your name');
    await dialog.accept(promptInput);
  });
  await alertsPage.clickPromptButton();
  await expect(page.locator('#promptResult')).toContainText(promptInput);
});

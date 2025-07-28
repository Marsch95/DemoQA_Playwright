import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';

let menuPage: MenuPage;

test.describe('Menu', () => {
  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.goto();
  });

  test('should display all top-level menu items', async () => {
    const items = ['Main Item 1', 'Main Item 2', 'Main Item 3'];
    for (const item of items) {
      expect(await menuPage.isMenuItemVisible(item)).toBe(true);
    }
  });

  test('should show sub menu items on hover', async () => {
    await menuPage.hoverMenuItem('Main Item 2');
    expect(await menuPage.isMenuItemVisible('SUB SUB LIST')).toBe(true);
    expect(await menuPage.isMenuItemVisible('Sub Item')).toBe(true);
  });

  test('should show sub-sub menu items on hover', async () => {
    await menuPage.hoverMenuItem('Main Item 2');
    await menuPage.hoverMenuItem('SUB SUB LIST');
    expect(await menuPage.isMenuItemVisible('Sub Sub Item 1')).toBe(true);
    expect(await menuPage.isMenuItemVisible('Sub Sub Item 2')).toBe(true);
  });
});

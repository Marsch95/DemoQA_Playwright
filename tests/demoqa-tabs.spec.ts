import { test, expect } from '@playwright/test';
import { TabsPage } from '../pages/TabsPage';

let tabsPage: TabsPage;

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => {
    tabsPage = new TabsPage(page);
    await tabsPage.goto();
  });

  test('should display correct content when switching tabs', async () => {
    // Check default tab content
    expect(await tabsPage.getActiveTabContent()).toContain('Lorem Ipsum is simply dummy text of the printing and typesetting industry');

    // Switch to Origin tab
    await tabsPage.clickTab(tabsPage.tabOrigin);
    expect(await tabsPage.getActiveTabContent()).toContain('Contrary to popular belief, Lorem Ipsum is not simply random text');

    // Switch to Use tab
    await tabsPage.clickTab(tabsPage.tabUse);
    expect(await tabsPage.getActiveTabContent()).toContain('Many desktop publishing packages and web page editors now use Lorem Ipsum');

    // Switch to More tab
    expect(await tabsPage.getMoreTabDisabled()).toBeTruthy;
    //expect(await tabsPage.getActiveTabContent()).toContain('More');
  });
});

import { test, expect } from '@playwright/test';
import { AccordianPage } from '../pages/AccordianPage';

let accordianPage: AccordianPage;

test.describe('Accordian', () => {
  test.beforeEach(async ({ page }) => {
    accordianPage = new AccordianPage(page);
    await accordianPage.goto();
  });

  test('expand and verify section 1', async () => {
    await accordianPage.expandSection1();
    expect(await accordianPage.getSection1Text()).toContain('unknown printer took a galley');
  });

  test('expand and verify section 2', async () => {
    await accordianPage.expandSection2();
    expect(await accordianPage.getSection2Text()).toContain('over 2000 years old');
  });

  test('expand and verify section 3', async () => {
    await accordianPage.expandSection3();
    expect(await accordianPage.getSection3Text()).toContain('publishing packages and web page editors');
  });
});

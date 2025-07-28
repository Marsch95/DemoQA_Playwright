import { test, expect } from '@playwright/test';
import { ModalDialogsPage } from '../pages/ModalDialogsPage';

let modalDialogsPage: ModalDialogsPage;

test.describe('Modal Dialogs', () => {
  test.beforeEach(async ({ page }) => {
    modalDialogsPage = new ModalDialogsPage(page);
    await modalDialogsPage.goto();
  });

  test('open and verify small modal dialog', async () => {
    // Open small modal and verify its content
    await modalDialogsPage.openSmallModal();
    const smallModalText = await modalDialogsPage.getSmallModalText();
    expect(smallModalText).toContain('This is a small modal. It has very less content');
    await modalDialogsPage.closeSmallModal();
    // Ensure modal is closed
    await expect(modalDialogsPage.smallModal).toBeHidden();
  });

  test('open and verify large modal dialog', async () => {
    // Open large modal and verify its content
    await modalDialogsPage.openLargeModal();
    const largeModalText = await modalDialogsPage.getLargeModalText();
    expect(largeModalText).toContain("Lorem Ipsum has been the industry's standard dummy text ever since the 1500s");
    await modalDialogsPage.closeLargeModal();
    // Ensure modal is closed
    await expect(modalDialogsPage.largeModal).toBeHidden();
  });
});

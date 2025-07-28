import { test, expect } from '@playwright/test';
import { NestedFramesPage } from '../pages/NestedFramesPage';

let nestedFramesPage: NestedFramesPage;

test.describe('Nested Frames', () => {
  test.beforeEach(async ({ page }) => {
    nestedFramesPage = new NestedFramesPage(page);
    await nestedFramesPage.goto();
  });

  test('verify text in parent frame', async () => {
    // Get and verify the text in the parent frame
    const parentText = await nestedFramesPage.getParentFrameText();
    expect(parentText).toContain('Parent frame');
  });

  test('verify text in child frame', async () => {
    // Get and verify the text in the child frame
    const childText = await nestedFramesPage.getChildFrameText();
    expect(childText).toContain('Child Iframe');
  });
});
 
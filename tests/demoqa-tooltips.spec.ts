import { test, expect } from '@playwright/test';
import { ToolTipsPage } from '../pages/ToolTipsPage';

let toolTipsPage: ToolTipsPage;

test.describe('Tool Tips', () => {
  test.beforeEach(async ({ page }) => {
    toolTipsPage = new ToolTipsPage(page);
    await toolTipsPage.goto();
  });

  test('should show tooltip on button hover', async () => {
    await toolTipsPage.hoverElement(toolTipsPage.button);
    expect(await toolTipsPage.getTooltipText()).toContain('You hovered over the Button');
  });

  test('should show tooltip on text field hover', async () => {
    await toolTipsPage.hoverElement(toolTipsPage.textField);
    expect(await toolTipsPage.getTooltipText()).toContain('You hovered over the text field');
  });

  test('should show tooltip on link hover (Contrary)', async () => {
    await toolTipsPage.hoverElement(toolTipsPage.linkContrary);
    expect(await toolTipsPage.getTooltipText()).toContain('You hovered over the Contrary');
  });

  test('should show tooltip on link hover (1.10.32)', async () => {
    await toolTipsPage.hoverElement(toolTipsPage.linkVersion);
    // Adjust expected text if needed based on actual tooltip content
    expect(await toolTipsPage.getTooltipText()).toContain('You hovered over the 1.10.32');
  });
});

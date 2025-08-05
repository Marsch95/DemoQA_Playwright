import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { ButtonPage } from '../pages/ButtonPage';
import { LinksPage } from '../pages/LinksPage';
import { BrokenPage } from '../pages/BrokenPage';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { DynamicPropertiesPage } from '../pages/DynamicPropertiesPage';
import fs from 'fs';

// Elements: Text Box
let textBoxPage: TextBoxPage;
test.describe('Text Box', () => {
  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });
  test('Interact with Text Box elements at DemoQA', async () => {
    // Fill the form fields
    await textBoxPage.fillForm('John Doe', 'john@example.com', '123 Main St', '456 Elm St');

    // Submit the form
    await textBoxPage.submit();

    // Verify the output
    const output = await textBoxPage.getOutput();
    expect(output.name).toContain('John Doe');
    expect(output.email).toContain('john@example.com');
    expect(output.currentAddress).toContain('123 Main St');
    expect(output.permanentAddress).toContain('456 Elm St');
  });
});

// Elements: Check Box
let checkBoxPage: CheckBoxPage;
test.describe('Check Box', () => {
  test.beforeEach(async ({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    await checkBoxPage.goto();
  });
  test('Interact with Check Box elements at DemoQA', async ({ page }) => {
    // Expand all checkboxes
    await checkBoxPage.expandAll();
    await checkBoxPage.collapseAll();

    // Expand Documents, WorkSpace, and Office nodes using POM
    await checkBoxPage.expandNode('Home');
    await checkBoxPage.expandNode('Documents');
    await checkBoxPage.expandNode('WorkSpace');
    await checkBoxPage.expandNode('Office');

    // Check only React, Classified, and Download checkboxes
    await page.locator('label[for="tree-node-react"] span.rct-checkbox').click();
    await page.locator('label[for="tree-node-classified"] span.rct-checkbox').click();
    await page.locator('label[for="tree-node-downloads"] span.rct-checkbox').click();

    // Verify the result text
    const resultText = await checkBoxPage.getResultText();
    expect(resultText).toContain('You have selected :');
    expect(resultText).toContain('react');
    expect(resultText).toContain('classified');
    expect(resultText).toContain('downloads');
    expect(resultText).toContain('wordFile');
    expect(resultText).toContain('excelFile');
  });
});

// Elements: Radio Button
let radioButtonPage: RadioButtonPage;
test.describe('Radio Button', () => {
  test.beforeEach(async ({ page }) => {
    radioButtonPage = new RadioButtonPage(page);
    await radioButtonPage.goto();
  });
  test('Interact with Radio Button elements at DemoQA', async () => {
    // Select 'Yes' radio button and verify result
    await radioButtonPage.selectYes();
    expect(await radioButtonPage.getResultText()).toContain('Yes');

    // Select 'Impressive' radio button and verify result
    await radioButtonPage.selectImpressive();
    expect(await radioButtonPage.getResultText()).toContain('Impressive');

    // Try to select 'No' radio button (should be disabled)
    await expect(radioButtonPage.noRadio).toBeDisabled();
  });
});

// Elements: Web Tables
let webTablesPage: WebTablesPage;
test.describe('Web Tables', () => {
  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();
  });
  test('Interact with Web Tables elements at DemoQA', async () => {
    // Add a new record
    await webTablesPage.addRecord(
      'Alice',
      'Smith',
      'alice.smith@example.com',
      '30',
      '50000',
      'Engineering'
    );

    // Verify the new record appears in the table
    const rows = await webTablesPage.getTableRows();
    const found = rows.some(
      (row) =>
        row.includes('Alice') && row.includes('Smith') && row.includes('alice.smith@example.com')
    );
    expect(found).toBeTruthy();

    // Add a new record to ensure it exists
    await webTablesPage.addRecord('Bob', 'Johnson', 'bob.johnson@example.com', '40', '60000', 'HR');

    // Edit the record using POM
    await webTablesPage.clickEditButton('Bob');
    await webTablesPage.firstNameInput.fill('Robert');
    await webTablesPage.submitButton.click();

    // Verify the edited record
    const rowsAfterEdit = await webTablesPage.getTableRows();
    const foundEdited = rowsAfterEdit.some(
      (row) =>
        row.includes('Robert') && row.includes('Johnson') && row.includes('bob.johnson@example.com')
    );
    expect(foundEdited).toBeTruthy();

    // Delete the record using POM
    await webTablesPage.clickDeleteButton('Robert');

    // Verify the record is deleted
    const rowsAfterDelete = await webTablesPage.getTableRows();
    const foundDeleted = rowsAfterDelete.some(
      (row) => row.includes('Robert') && row.includes('Johnson')
    );
    expect(foundDeleted).toBeFalsy();

    // Search for a record using POM
    await webTablesPage.search('Alice');
    const searchRows = await webTablesPage.getTableRows();
    const foundSearch = searchRows.some((row) => row.includes('Alice') && row.includes('Smith'));
    expect(foundSearch).toBeTruthy();
  });
});

// Elements: Buttons
let buttonPage: ButtonPage;
test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    buttonPage = new ButtonPage(page);
    await buttonPage.goto();
  });
  test('Interact with Buttons at DemoQA', async () => {
    // Double click and verify message
    await buttonPage.doubleClick();
    expect(await buttonPage.getDoubleClickMsg()).toContain('You have done a double click');

    // Right click and verify message
    await buttonPage.rightClick();
    expect(await buttonPage.getRightClickMsg()).toContain('You have done a right click');

    // Click Me and verify message
    await buttonPage.clickMe();
    expect(await buttonPage.getClickMeMsg()).toContain('You have done a dynamic click');
  });
});

// Elements: Links
let linksPage: LinksPage;
test.describe('Links', () => {
  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    await linksPage.goto();
  });
  test('Interact with Links at DemoQA', async ({ page }) => {
    // Click the Home link and verify it opens a new tab
    const [homeTab] = await Promise.all([
      page.context().waitForEvent('page'),
      linksPage.clickHomeLink(),
    ]);
    expect(homeTab.url()).toContain('demoqa.com');
    await homeTab.close();

    // Click the Dynamic Home link and verify it opens a new tab
    const [dynamicTab] = await Promise.all([
      page.context().waitForEvent('page'),
      linksPage.clickDynamicHomeLink(),
    ]);
    expect(dynamicTab.url()).toContain('demoqa.com');
    await dynamicTab.close();

    // Click each API link and verify the response message
    // Created (201)
    await linksPage.clickApiLink(linksPage.createdLink);
    expect(await linksPage.getLinkResponse()).toContain('201');

    // No Content (204)
    await Promise.all([
      page.waitForResponse((response) => response.status() === 204),
      linksPage.clickNoContentLink(),
    ]);
    expect(await linksPage.getLinkResponse()).toContain('204');

    // Moved (301)
    await Promise.all([
      page.waitForResponse((response) => response.status() === 301),
      linksPage.clickApiLink(linksPage.movedLink),
    ]);
    expect(await linksPage.getLinkResponse()).toContain('301');

    // Bad Request (400)
    await Promise.all([
      page.waitForResponse((response) => response.status() === 400),
      linksPage.clickApiLink(linksPage.badRequestLink),
    ]);
    expect(await linksPage.getLinkResponse()).toContain('400');

    // Unauthorized (401)
    await Promise.all([
      page.waitForResponse((response) => response.status() === 401),
      linksPage.clickApiLink(linksPage.unauthorizedLink),
    ]);

    expect(await linksPage.getLinkResponse()).toContain('401');

    // Forbidden (403)
    await Promise.all([
      page.waitForResponse((response) => response.status() === 403),
      linksPage.clickApiLink(linksPage.forbiddenLink),
    ]);
    expect(await linksPage.getLinkResponse()).toContain('403');

    // Not Found (404)
    await Promise.all([
      page.waitForResponse((response) => response.status() === 404),
      linksPage.clickApiLink(linksPage.notFoundLink),
    ]);
    expect(await linksPage.getLinkResponse()).toContain('404');
  });
});

// Elements: Broken Links and Images
let brokenPage: BrokenPage;
test.describe('Broken Links and Images', () => {
  test.beforeEach(async ({ page }) => {
    brokenPage = new BrokenPage(page);
    await brokenPage.goto();
  });
  test('Interact with Broken Links and Images at DemoQA', async ({ page }) => {
    // Check if valid image is loaded
    expect(await brokenPage.isImageBroken(brokenPage.validImage)).toBeFalsy();

    // Check if broken image is not loaded
    expect(await brokenPage.isImageBroken(brokenPage.brokenImage)).toBeTruthy();

    // Click valid link and verify navigation
    await brokenPage.clickValidLink();
    expect(page.url()).toContain('demoqa.com');
    await page.goBack();

    // Click broken link and verify navigation to 500 page
    await brokenPage.clickBrokenLink();
    expect(page.url()).toContain('status_codes/500');
  });
});

// Elements: Upload and Download
let uploadDownloadPage: UploadDownloadPage;
test.describe('Upload and Download', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.goto();
    // Prepare a file to upload (use a sample file from the test project)
    const filePath = testInfo.project.testDir + '/sample-upload.txt';
    // Create the file if it doesn't exist
    //const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'DemoQA upload test file');
    }
  });
  test('Interact with Upload and Download at DemoQA', async () => {
    // Upload the file
    await uploadDownloadPage.uploadFile('tests/sample-upload.txt');
    // Verify the uploaded file name appears
    const uploadedText = await uploadDownloadPage.getUploadedFileName();
    expect(uploadedText).toContain('sample-upload.txt');

    // Download the file (cannot verify download in browser-only context)
    await uploadDownloadPage.downloadFile();
    // Optionally, add a check for download event if running in headed mode with downloads enabled
  });
});

// Elements: Dynamic Properties
let dynamicPage: DynamicPropertiesPage;
test.describe('Dynamic Properties', () => {
  test.beforeEach(async ({ page }) => {
    dynamicPage = new DynamicPropertiesPage(page);
    await dynamicPage.goto();
  });
  test('Interact with Dynamic Properties at DemoQA', async () => {
    // Wait for the 'Will enable 5 seconds' button to become enabled
    await dynamicPage.waitForEnableAfter();
    expect(await dynamicPage.enableAfterButton.isEnabled()).toBeTruthy();

    // Check color change of the 'Color Change' button
    const initialColor = await dynamicPage.getColorChangeButtonColor();
    // Wait up to 10s for the color to change (robust for CI)
    const colorChangeSelector = '#colorChange'; // Use the actual selector
    const changedColor = await dynamicPage.page.waitForFunction(
      ({ selector, initial }: { selector: string; initial: string }) => {
        const el = document.querySelector(selector);
        if (!el) return initial;
        return getComputedStyle(el as HTMLElement).color !== initial ? getComputedStyle(el as HTMLElement).color : initial;
      },
      { selector: colorChangeSelector, initial: initialColor },
      { timeout: 10000 }
    );
    expect(changedColor).not.toBe(initialColor);

    // Wait for the 'Visible After 5 Seconds' button to appear
    await dynamicPage.waitForVisibleAfter();
    expect(await dynamicPage.visibleAfterButton.isVisible()).toBeTruthy();
  });
});

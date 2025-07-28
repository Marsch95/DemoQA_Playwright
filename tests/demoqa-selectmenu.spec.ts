import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../pages/SelectMenuPage';

let selectMenuPage: SelectMenuPage;

test.describe('Select Menu', () => {
  test.beforeEach(async ({ page }) => {
    selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.goto();
  });

  test('should select value from old style select menu', async () => {
    await selectMenuPage.selectOldStyleOptionByLabel('Purple');
    expect(await selectMenuPage.getOldStyleSelectedValue()).toBe('4');
  });

  test('should select multiple values from standard multi select', async () => {
    await selectMenuPage.selectStandardMultiOptions(['volvo', 'audi']);
    const selected = await selectMenuPage.getStandardMultiSelectedValues();
    expect(selected).toEqual(expect.arrayContaining(['volvo', 'audi']));
  });

  test('should select value from Select Value dropdown', async () => {
    await selectMenuPage.selectCustomDropdownOption(selectMenuPage.selectValue, 'Group 2, option 2');
    const selectedText = await selectMenuPage.getCustomDropdownSelectedText();
    expect(selectedText).toContain('Group 2, option 2');
  });

  test('should select value from Select One dropdown', async () => {
    await selectMenuPage.selectCustomDropdownOption(selectMenuPage.selectOne, 'Dr.');
    const selectedText = await selectMenuPage.getCustomDropdownSelectedText();
    expect(selectedText).toContain('Dr.');
  });

  test('should select multiple values from multiselect dropdown', async () => {
    await selectMenuPage.selectCustomMultiDropdownOptions(selectMenuPage.multiSelectDropDown, ['Green', 'Blue']);
    const selectedOptions = await selectMenuPage.getCustomMultiDropdownSelectedTexts();
    expect(selectedOptions).toEqual(expect.arrayContaining(['Green', 'Blue']));
  });

  // Add more tests for other select menus as needed
});

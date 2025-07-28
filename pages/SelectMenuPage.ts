// Page Object Model for the Select Menu page at DemoQA
import { Page, Locator } from '@playwright/test';

export class SelectMenuPage {
  readonly page: Page;
  readonly selectValue: Locator;
  readonly selectOne: Locator;
  readonly oldStyleSelect: Locator;
  readonly multiSelectDropDown: Locator;
  readonly standardMultiSelect: Locator;
  readonly customDropdownSelectedValue: Locator;
  readonly customMultiDropdownSelectedValues: Locator;
  readonly customDropdownMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectValue = page.locator('#withOptGroup');
    this.selectOne = page.locator('#selectOne');
    this.oldStyleSelect = page.locator('#oldSelectMenu');
    this.multiSelectDropDown = page.locator('#selectMenuContainer svg').nth(2);
    this.standardMultiSelect = page.locator('#cars');
    this.customDropdownSelectedValue = page.locator('.css-1uccc91-singleValue');
    this.customMultiDropdownSelectedValues = page.locator('.css-12jo7m5');
    this.customDropdownMenu = page.locator('.css-11unzgr');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/select-menu');
  }

  /**
   * Select an option from the old style <select> menu by label
   */
  async selectOldStyleOptionByLabel(label: string) {
    await this.oldStyleSelect.selectOption({ label });
  }

  /**
   * Get the selected value from the old style <select> menu
   */
  async getOldStyleSelectedValue(): Promise<string> {
    return await this.oldStyleSelect.inputValue();
  }

  /**
   * Select multiple options from the standard multi-select <select>
   */
  async selectStandardMultiOptions(values: string[]) {
    await this.standardMultiSelect.selectOption(values);
  }

  /**
   * Get all selected values from the standard multi-select <select>
   */
  async getStandardMultiSelectedValues(): Promise<string[]> {
    return await this.standardMultiSelect.evaluate((el: HTMLSelectElement) => Array.from(el.selectedOptions).map(o => o.value));
  }

  /**
   * Select an option from a custom dropdown (Select Value or Select One)
   */
  async selectCustomDropdownOption(dropdown: Locator, optionText: string) {
    await dropdown.click();
    //await this.customDropdownMenu.waitFor({ state: 'visible' });
    await this.page.getByText(optionText, { exact: true }).click();
  }

  /**
   * Get the selected text from a custom dropdown (Select Value or Select One)
   */
  async getCustomDropdownSelectedText(): Promise<string> {
    return (await this.customDropdownSelectedValue.textContent()) ?? '';
  }

  /**
   * Select multiple options from the custom multiselect dropdown
   */
  async selectCustomMultiDropdownOptions(dropdown: Locator, optionTexts: string[]) {
    await dropdown.click();
    await this.customDropdownMenu.waitFor({ state: 'visible' });
    for (const text of optionTexts) {
      await this.customDropdownMenu.getByText(text, { exact: true }).click();
    }
  }

  /**
   * Get all selected texts from the custom multiselect dropdown
   */
  async getCustomMultiDropdownSelectedTexts(): Promise<string[]> {
    return await this.customMultiDropdownSelectedValues.allTextContents();
  }
}

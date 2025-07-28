// Page Object Model for the Web Tables page at DemoQA
import { Page, Locator } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitButton: Locator;
  readonly tableRows: Locator;
  readonly editButton: (name: string) => Locator;
  readonly deleteButton: (name: string) => Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator('#addNewRecordButton');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');
    this.tableRows = page.locator('.rt-tbody .rt-tr-group');
    this.editButton = (name: string) =>
      page.locator('.rt-tbody .rt-tr-group').filter({ hasText: name }).locator('[title="Edit"]');
    this.deleteButton = (name: string) =>
      page.locator('.rt-tbody .rt-tr-group').filter({ hasText: name }).locator('[title="Delete"]');
    this.searchBox = page.locator('#searchBox');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  async addRecord(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    salary: string,
    department: string
  ) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();
  }

  async getTableRows() {
    return await this.tableRows.allTextContents();
  }

  /**
   * Clicks the edit button for a row containing the given name
   */
  async clickEditButton(name: string) {
    await this.editButton(name).click();
  }

  /**
   * Clicks the delete button for a row containing the given name
   */
  async clickDeleteButton(name: string) {
    await this.deleteButton(name).click();
  }

  /**
   * Fills the search box with the given value
   */
  async search(value: string) {
    await this.searchBox.fill(value);
  }
}

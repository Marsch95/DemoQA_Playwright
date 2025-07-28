// Page Object Model for the Date Picker page at DemoQA
import { Page, Locator } from '@playwright/test';

export class DatePickerPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly dateTimeInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.locator('#datePickerMonthYearInput');
    this.dateTimeInput = page.locator('#dateAndTimePickerInput');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/date-picker');
  }

  async setDate(date: string) {
    await this.dateInput.fill(date);
    await this.dateInput.press('Enter');
  }

  async getDate(): Promise<string> {
    return await this.dateInput.inputValue();
  }

  async setDateTime(dateTime: string) {
    await this.dateTimeInput.fill(dateTime);
    await this.dateTimeInput.press('Enter');
  }

  async getDateTime(): Promise<string> {
    return await this.dateTimeInput.inputValue();
  }

  /**
   * Select a date using the calendar UI (year, month, day)
   * @param year e.g. '2025'
   * @param month e.g. 'July' (case-sensitive, as shown in dropdown)
   * @param day e.g. '25'
   */
  async selectDate(year: string, month: string, day: string) {
    await this.dateInput.click(); // Open the calendar
    await this.page.locator('.react-datepicker__year-select').selectOption(year);
    await this.page.locator('.react-datepicker__month-select').selectOption(month);
    // Day selector: pad single digits, match class for day
    const daySelector = `.react-datepicker__day--0${day.padStart(2, '0')}`;
    await this.page.locator(daySelector).first().click();
  }
}

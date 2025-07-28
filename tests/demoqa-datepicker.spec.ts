import { test, expect } from '@playwright/test';
import { DatePickerPage } from '../pages/DatePickerPage';

let datePickerPage: DatePickerPage;

test.describe('Date Picker', () => {
  test.beforeEach(async ({ page }) => {
    datePickerPage = new DatePickerPage(page);
    await datePickerPage.goto();
  });

  test('set and verify simple date', async () => {
    const date = '07/25/2025';
    await datePickerPage.setDate(date);
    expect(await datePickerPage.getDate()).toBe(date);
  });

  test('select and verify date using calendar UI', async () => {
    // Select July 25, 2025 using the calendar dropdowns
    await datePickerPage.selectDate('2025', 'July', '25');
    expect(await datePickerPage.getDate()).toBe('07/25/2025');
  });

  test('set and verify date and time', async () => {
    const dateTime = 'July 25, 2025 10:30 AM';
    await datePickerPage.setDateTime(dateTime);
    expect(await datePickerPage.getDateTime()).toContain('July 25, 2025');
    expect(await datePickerPage.getDateTime()).toContain('10:30');
  });
});

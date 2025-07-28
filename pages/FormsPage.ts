// Page Object Model for the Forms section at DemoQA
import { Page, Locator } from '@playwright/test';

export class FormsPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly genderRadio: (gender: string) => Locator;
  readonly mobile: Locator;
  readonly dobInput: Locator;
  readonly subjectsInput: Locator;
  readonly hobbiesCheckbox: (hobby: string) => Locator;
  readonly uploadPicture: Locator;
  readonly address: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly submitButton: Locator;
  readonly modal: Locator;
  readonly modalRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderRadio = (gender: string) => page.locator(`input[name="gender"][value="${gender}"]`).locator('..');
    this.mobile = page.locator('#userNumber');
    this.dobInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.hobbiesCheckbox = (hobby: string) => page.locator('label').filter({ hasText: hobby });
    this.uploadPicture = page.locator('#uploadPicture');
    this.address = page.locator('#currentAddress');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.modalRows = page.locator('.modal-content tbody tr');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobile: string;
    dob?: string;
    subjects?: string[];
    hobbies?: string[];
    picturePath?: string;
    address?: string;
    state?: string;
    city?: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.genderRadio(data.gender).click();
    await this.mobile.fill(data.mobile);
    if (data.dob) {
      await this.dobInput.click();
      await this.dobInput.fill(data.dob); // expects format '01 Jan 2000'
      await this.dobInput.press('Enter');
    }
    if (data.subjects) {
      for (const subject of data.subjects) {
        await this.subjectsInput.fill(subject);
        await this.subjectsInput.press('Enter');
      }
    }
    if (data.hobbies) {
      for (const hobby of data.hobbies) {
        await this.hobbiesCheckbox(hobby).click();
      }
    }
    if (data.picturePath) {
      await this.uploadPicture.setInputFiles(data.picturePath);
    }
    if (data.address) {
      await this.address.fill(data.address);
    }
    if (data.state) {
      await this.state.click();
      await this.page.locator(`div[id^=react-select][id*=-option-]`).filter({ hasText: data.state }).click();
    }
    if (data.city) {
      await this.city.click();
      await this.page.locator(`div[id^=react-select][id*=-option-]`).filter({ hasText: data.city }).click();
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async getSubmissionResult(): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    const rows = await this.modalRows.all();
    for (const row of rows) {
      const key = (await row.locator('td').nth(0).innerText()).trim();
      const value = (await row.locator('td').nth(1).innerText()).trim();
      result[key] = value;
    }
    return result;
  }
}

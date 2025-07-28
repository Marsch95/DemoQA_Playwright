// Page Object Model for the Text Box page at DemoQA
import { Page, Locator } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;
  readonly outputCurrentAddress: Locator;
  readonly outputPermanentAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('p#currentAddress');
    this.outputPermanentAddress = page.locator('p#permanentAddress');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  async fillForm(
    fullName: string,
    email: string,
    currentAddress: string,
    permanentAddress: string
  ) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.fill(permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }

  async getOutput() {
    return {
      name: await this.outputName.textContent(),
      email: await this.outputEmail.textContent(),
      currentAddress: await this.outputCurrentAddress.textContent(),
      permanentAddress: await this.outputPermanentAddress.textContent(),
    };
  }
}

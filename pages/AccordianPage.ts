// Page Object Model for the Accordian page at DemoQA
import { Page, Locator } from '@playwright/test';

export class AccordianPage {
  readonly page: Page;
  readonly section1Header: Locator;
  readonly section2Header: Locator;
  readonly section3Header: Locator;
  readonly section1Content: Locator;
  readonly section2Content: Locator;
  readonly section3Content: Locator;

  constructor(page: Page) {
    this.page = page;
    this.section1Header = page.locator('#section1Heading');
    this.section2Header = page.locator('#section2Heading');
    this.section3Header = page.locator('#section3Heading');
    this.section1Content = page.locator('#section1Content');
    this.section2Content = page.locator('#section2Content');
    this.section3Content = page.locator('#section3Content p');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/accordian');
  }

  async expandSection1() {
    await this.section1Header.click();
  }

  async expandSection2() {
    await this.section2Header.click();
  }

  async expandSection3() {
    await this.section3Header.click();
  }

  async getSection1Text(): Promise<string> {
    return await this.section1Content.innerText();
  }

  async getSection2Text(): Promise<string> {
    return await this.section2Content.innerText();
  }

  async getSection3Text(): Promise<string> {
    return await this.section3Content.innerText();
  }
}

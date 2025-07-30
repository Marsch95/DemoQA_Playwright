import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the DemoQA Links page
 * Encapsulates all locators and actions for maintainable and scalable tests
 */
export class LinksPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dynamicHomeLink: Locator;
  readonly createdLink: Locator;
  readonly noContentLink: Locator;
  readonly movedLink: Locator;
  readonly badRequestLink: Locator;
  readonly unauthorizedLink: Locator;
  readonly forbiddenLink: Locator;
  readonly notFoundLink: Locator;
  readonly linkResponse: Locator;

  
  constructor(page: Page) {
    this.page = page;
    // Locators for Home and Dynamic Home links (disambiguate if multiple found)
    this.homeLink = page.getByRole('link', { name: 'Home' }).nth(0); // First Home link
    this.dynamicHomeLink = page.getByRole('link', { name: 'Home' }).nth(1); // Second Home link (Dynamic)
    // Locators for all other links and response message
    this.createdLink = page.getByRole('link', { name: 'Created' });
    this.noContentLink = page.getByRole('link', { name: 'No Content' });
    this.movedLink = page.getByRole('link', { name: 'Moved' });
    this.badRequestLink = page.getByRole('link', { name: 'Bad Request' });
    this.unauthorizedLink = page.getByRole('link', { name: 'Unauthorized' });
    this.forbiddenLink = page.getByRole('link', { name: 'Forbidden' });
    this.notFoundLink = page.getByRole('link', { name: 'Not Found' });
    this.linkResponse = page.locator('#linkResponse');
  }

  /**
   * Navigate to the Links page
   */
  async goto() {
    await this.page.goto('https://demoqa.com/links');
  }

  /**
   * Click the Home link (opens a new tab)
   */
  async clickHomeLink() {
    await this.homeLink.click();
  }

  /**
   * Click the Dynamic Home link (opens a new tab)
   */
  async clickDynamicHomeLink() {
    await this.dynamicHomeLink.click();
  }

  /**
   * Click any API link by passing its locator
   */
  async clickApiLink(link: Locator) {
    await link.click();
  }

  /**
   * Click the No Content link (special case for 204 response)
   */
  async clickNoContentLink() {
    await this.noContentLink.click();
  }

  /**
   * Get the response message text after clicking an API link
   */
  async getLinkResponse() {
    return await this.linkResponse.textContent();
  }
}

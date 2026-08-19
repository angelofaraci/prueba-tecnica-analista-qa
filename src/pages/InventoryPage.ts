import { By, WebDriver } from 'selenium-webdriver';
import { waitForClickable, waitForVisible } from '../utils/waits';

function toSlug(name: string): string {
  return name.toLowerCase().replaceAll(' ', '-');
}

export class InventoryPage {

  private readonly title = By.css('[data-test="title"]');
  private readonly cartBadge = By.css('[data-test="shopping-cart-badge"]');
  private readonly cartLink = By.css('[data-test="shopping-cart-link"]');

  constructor(private readonly driver: WebDriver) {}

  async isLoaded(): Promise<boolean> {
    const elements = await this.driver.findElements(this.title);
    return elements.length > 0;
  }

  async getTitle(): Promise<string> {
    const element = await waitForVisible(this.driver, this.title);
    return element.getText();
  }

  async addProductToCart(name: string): Promise<void> {
    const slug = toSlug(name);
    const locator = By.css(`[data-test="add-to-cart-${slug}"]`);
    const button = await waitForClickable(this.driver, locator);
    await button.click();
  }

  async getCartBadgeCount(): Promise<number> {
    const elements = await this.driver.findElements(this.cartBadge);
    if (elements.length === 0) {
      return 0;
    }
    const text = await elements[0].getText();
    return text ? parseInt(text, 10) : 0;
  }

  async openCart(): Promise<void> {
    const link = await waitForClickable(this.driver, this.cartLink);
    await link.click();
  }
}

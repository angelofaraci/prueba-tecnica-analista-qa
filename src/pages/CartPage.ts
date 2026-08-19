import { By, WebDriver } from 'selenium-webdriver';
import { waitForAbsent, waitForClickable } from '../utils/waits';

function toSlug(name: string): string {
  return name.toLowerCase().replaceAll(' ', '-');
}

export class CartPage {
  private readonly cartItems = By.css('.cart_item');
  private readonly itemName = By.css('[data-test="inventory-item-name"]');
  private readonly checkoutButton = By.css('[data-test="checkout"]');

  constructor(private readonly driver: WebDriver) {}

  async isLoaded(): Promise<boolean> {
    const elements = await this.driver.findElements(this.checkoutButton);
    return elements.length > 0;
  }

  async getItemNames(): Promise<string[]> {
    const elements = await this.driver.findElements(this.itemName);
    return Promise.all(elements.map((element) => element.getText()));
  }

  async getItemCount(): Promise<number> {
    const elements = await this.driver.findElements(this.cartItems);
    return elements.length;
  }

  async removeProduct(name: string): Promise<void> {
    const slug = toSlug(name);
    const locator = By.css(`[data-test="remove-${slug}"]`);
    const button = await waitForClickable(this.driver, locator);
    await button.click();
    await waitForAbsent(this.driver, locator);
  }

  async goToCheckout(): Promise<void> {
    const button = await waitForClickable(this.driver, this.checkoutButton);
    await button.click();
  }
}

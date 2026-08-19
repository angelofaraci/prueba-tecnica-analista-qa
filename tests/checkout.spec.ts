import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { CHECKOUT_INFO, PRODUCTS } from '../src/data/users';
import { loginAsStandardUser } from '../src/flows/auth';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { buildDriver, quit } from '../src/utils/driver';

describe('Checkout', function () {
  let driver: WebDriver;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  before(async function () {
    driver = await buildDriver();
    this.driver = driver;
    const inventoryPage: InventoryPage = await loginAsStandardUser(driver);
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.openCart();
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
  });

  after(async function () {
    await quit(driver);
  });

  it('completes the checkout flow and shows the order confirmation', async function () {
    await cartPage.goToCheckout();
    await checkoutPage.fillInformation(CHECKOUT_INFO);
    await checkoutPage.continueToOverview();
    await checkoutPage.finish();

    expect(await checkoutPage.getCompleteHeader()).to.equal('Thank you for your order!');
  });
});

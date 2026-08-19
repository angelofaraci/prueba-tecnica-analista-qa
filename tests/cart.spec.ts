import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { PRODUCTS } from '../src/data/users';
import { loginAsStandardUser } from '../src/flows/auth';
import { CartPage } from '../src/pages/CartPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { buildDriver, quit } from '../src/utils/driver';


describe('Cart', function () {
  let driver: WebDriver;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  before(async function () {
    driver = await buildDriver();
    this.driver = driver;
    inventoryPage = await loginAsStandardUser(driver);
    cartPage = new CartPage(driver);
  });

  after(async function () {
    await quit(driver);
  });

  it('adds two products to the cart and updates the badge count', async function () {
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.addProductToCart(PRODUCTS.BIKE_LIGHT);

    expect(await inventoryPage.getCartBadgeCount()).to.equal(1);
  });

  it('shows both added products in the cart', async function () {
    await inventoryPage.openCart();

    expect(await cartPage.isLoaded()).to.equal(true);
    const names = await cartPage.getItemNames();
    expect(names).to.include.members([PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT]);
    expect(await cartPage.getItemCount()).to.equal(2);
  });

  it('removes the backpack and leaves only the bike light', async function () {
    await cartPage.removeProduct(PRODUCTS.BACKPACK);

    expect(await cartPage.getItemCount()).to.equal(1);
    const names = await cartPage.getItemNames();
    expect(names).to.deep.equal([PRODUCTS.BIKE_LIGHT]);
  });
});

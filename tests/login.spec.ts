import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { INVALID_USER, STANDARD_USER, ERROR_MESSAGES, BASE_URL } from '../src/data/users';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';
import { buildDriver, quit } from '../src/utils/driver';
import { waitForUrlContains } from '../src/utils/waits';

describe('Login', function () {
  let driver: WebDriver;
  let loginPage: LoginPage;

  before(async function () {
    driver = await buildDriver();
    this.driver = driver;
    loginPage = new LoginPage(driver);
  });

  after(async function () {
    await quit(driver);
  });

  it('logs in with standard_user and loads the Products inventory (TC-LOGIN-01)', async function () {
    await loginPage.open();
    await loginPage.login(STANDARD_USER);

    await waitForUrlContains(driver, 'inventory.html');
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include(`${BASE_URL}/inventory.html`);

    const inventoryPage = new InventoryPage(driver);
    expect(await inventoryPage.isLoaded()).to.equal(true);
    expect(await inventoryPage.getTitle()).to.equal('Products');
  });

  it('rejects an invalid login and stays on the login page', async function () {
    await loginPage.open();
    await loginPage.login(INVALID_USER);

    expect(await loginPage.isErrorDisplayed()).to.equal(true);
    expect(await loginPage.getErrorMessage()).to.include(ERROR_MESSAGES.INVALID_CREDENTIALS);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.not.include('inventory.html');
  });
});

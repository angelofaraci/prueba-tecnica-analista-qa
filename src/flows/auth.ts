import { WebDriver } from 'selenium-webdriver';
import { STANDARD_USER } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

export async function loginAsStandardUser(driver: WebDriver): Promise<InventoryPage> {
  const loginPage = new LoginPage(driver);
  await loginPage.open();
  await loginPage.login(STANDARD_USER);
  return new InventoryPage(driver);
}

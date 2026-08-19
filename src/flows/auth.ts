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

const x = 'doble comilla';        // viola @stylistic/quotes (single)
const y: any = 5;                  // viola @typescript-eslint/no-explicit-any
if (x == y) {}                    // viola eqeqeq
function f(unused: string) {}     // viola @typescript-eslint/no-unused-vars

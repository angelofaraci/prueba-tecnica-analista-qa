import { By, WebDriver } from 'selenium-webdriver';
import { BASE_URL, Credentials } from '../data/users';
import { waitForClickable, waitForVisible } from '../utils/waits';

export class LoginPage {
  private readonly usernameInput = By.css('[data-test="username"]');
  private readonly passwordInput = By.css('[data-test="password"]');
  private readonly loginButton = By.css('[data-test="login-button"]');
  private readonly errorMessage = By.css('[data-test="error"]');

  constructor(private readonly driver: WebDriver) {}

  async open(): Promise<void> {
    await this.driver.get(BASE_URL);
    await waitForVisible(this.driver, this.usernameInput);
  }

  async login(creds: Credentials): Promise<void> {
    const username = await waitForVisible(this.driver, this.usernameInput);
    await username.clear();
    await username.sendKeys(creds.username);

    const password = await waitForVisible(this.driver, this.passwordInput);
    await password.clear();
    await password.sendKeys(creds.password);

    const button = await waitForClickable(this.driver, this.loginButton);
    await button.click();
  }

  async getErrorMessage(): Promise<string> {
    const element = await waitForVisible(this.driver, this.errorMessage);
    return element.getText();
  }

  async isErrorDisplayed(): Promise<boolean> {
    const elements = await this.driver.findElements(this.errorMessage);
    return elements.length > 0;
  }
}

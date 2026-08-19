import { By, WebDriver } from 'selenium-webdriver';
import { CheckoutInfo } from '../data/users';
import { waitForClickable, waitForVisible } from '../utils/waits';

export class CheckoutPage {
  private readonly firstNameInput = By.css('[data-test="firstName"]');
  private readonly lastNameInput = By.css('[data-test="lastName"]');
  private readonly postalCodeInput = By.css('[data-test="postalCode"]');
  private readonly continueButton = By.css('[data-test="continue"]');
  private readonly finishButton = By.css('[data-test="finish"]');
  private readonly completeHeader = By.css('[data-test="complete-header"]');

  constructor(private readonly driver: WebDriver) {}

  async fillInformation(info: CheckoutInfo): Promise<void> {
    const firstName = await waitForVisible(this.driver, this.firstNameInput);
    await firstName.clear();
    await firstName.sendKeys(info.firstName);

    const lastName = await waitForVisible(this.driver, this.lastNameInput);
    await lastName.clear();
    await lastName.sendKeys(info.lastName);

    const postalCode = await waitForVisible(this.driver, this.postalCodeInput);
    await postalCode.clear();
    await postalCode.sendKeys(info.postalCode);
  }

  async continueToOverview(): Promise<void> {
    const button = await waitForClickable(this.driver, this.continueButton);
    await button.click();
  }

  async finish(): Promise<void> {
    const button = await waitForClickable(this.driver, this.finishButton);
    await button.click();
  }

  async getCompleteHeader(): Promise<string> {
    const element = await waitForVisible(this.driver, this.completeHeader);
    return element.getText();
  }
}

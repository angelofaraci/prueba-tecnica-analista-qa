import { Builder, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export interface BuildDriverOptions {
  headless?: boolean;
}

export function buildDriver(options: BuildDriverOptions = {}): Promise<WebDriver> {
  const headless = options.headless ?? process.env.HEADLESS !== 'false';

  const chromeOptions = new chrome.Options();

  if (headless) {
    chromeOptions.addArguments('--headless=new');
  }
  chromeOptions.addArguments('--window-size=1920,1080');
  chromeOptions.addArguments('--disable-gpu');
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.addArguments('--disable-dev-shm-usage');
  chromeOptions.setUserPreferences({
    credentials_enable_service: false,
    'profile.password_manager_enabled': false,
    'profile.password_manager_leak_detection': false,
  });

  return new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
}

export async function quit(driver: WebDriver): Promise<void> {
  await driver.quit();
}

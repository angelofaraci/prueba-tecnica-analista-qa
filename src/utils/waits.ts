import { By, WebDriver, WebElement, until } from 'selenium-webdriver';

const DEFAULT_TIMEOUT_MS = 10000;

export async function waitForVisible(
  driver: WebDriver,
  locator: By,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WebElement> {
  const element = await driver.wait(until.elementLocated(locator), timeoutMs);
  await driver.wait(until.elementIsVisible(element), timeoutMs);
  return element;
}

export async function waitForClickable(
  driver: WebDriver,
  locator: By,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WebElement> {
  const element = await driver.wait(until.elementLocated(locator), timeoutMs);
  await driver.wait(until.elementIsVisible(element), timeoutMs);
  await driver.wait(until.elementIsEnabled(element), timeoutMs);
  return element;
}

export async function waitForUrlContains(
  driver: WebDriver,
  substring: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<boolean> {
  return driver.wait(until.urlContains(substring), timeoutMs);
}

export async function waitForText(
  driver: WebDriver,
  locator: By,
  text: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<boolean> {
  const element = await driver.wait(until.elementLocated(locator), timeoutMs);
  await driver.wait(until.elementTextContains(element, text), timeoutMs);
  return true;
}

export async function waitForStale(
  driver: WebDriver,
  element: WebElement,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<boolean> {
  return driver.wait(until.stalenessOf(element), timeoutMs);
}

export async function waitForAbsent(
  driver: WebDriver,
  locator: By,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<boolean> {
  return driver.wait(async () => {
    const elements = await driver.findElements(locator);
    return elements.length === 0;
  }, timeoutMs);
}

import * as fs from 'fs';
import * as path from 'path';
import { WebDriver } from 'selenium-webdriver';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots');

function isAlphanumeric(char: string): boolean {
  return (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9');
}

function sanitizeTitle(title: string): string {
  let result = '';
  let lastWasSeparator = false;
  for (const char of title.toLowerCase()) {
    if (isAlphanumeric(char)) {
      result += char;
      lastWasSeparator = false;
    } else if (!lastWasSeparator) {
      result += '-';
      lastWasSeparator = true;
    }
  }
  return result;
}

export const mochaHooks = {
  async afterEach(this: Mocha.Context): Promise<void> {
    const currentTest = this.currentTest;
    if (!currentTest || currentTest.state !== 'failed') {
      return;
    }
    const driver = (currentTest.ctx as unknown as { driver?: WebDriver } | undefined)?.driver;
    if (!driver) {
      return;
    }

    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }

    try {
      const screenshot = await driver.takeScreenshot();
      const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
      const fileName = `${sanitizeTitle(currentTest.fullTitle())}-${timestamp}.png`;
      const filePath = path.join(SCREENSHOTS_DIR, fileName);
      fs.writeFileSync(filePath, screenshot, 'base64');
    } catch {

    }
  },
};
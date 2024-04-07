import { Locator, Page, expect } from '@playwright/test';

const defaultTimeout = 8000;

export default class PageActions {
    constructor(private page: Page) { }

    getElement(
        locator: string | Locator,
        options?: {
            has?: Locator;
            hasText?: string;
        }
    ): Locator {
        if (typeof locator == 'string') {
            return this.page.locator(locator, {
                has: options?.has,
                hasText: options?.hasText
            });
        } else {
            return locator;
        }
    }

    async waitForElement(
        locator: string | Locator,
        state: 'attached' | 'detached' | 'visible' | 'hidden',
        timeout = defaultTimeout
    ) {
        await this.getElement(locator).first().waitFor({ state, timeout });
    }

    async waitForVisibility(locator: string | Locator, timeout?: number) {
        await this.waitForElement(locator, 'visible', timeout);
    }


    async typeText(
        locator: string | Locator,
        textToEnter: string,
        options?: { timeout?: number; }
    ) {
        const element = this.getElement(locator);
        await element.pressSequentially(textToEnter, { timeout: options?.timeout || defaultTimeout });
    }



    async click(
        locator: string | Locator,

    ) {
        await this.getElement(locator).click();
    }

    async getElementText(locator: string | Locator) {
        await this.waitForVisibility(locator);
        return this.getElement(locator).innerText({ timeout: defaultTimeout });
    }


    getFieldValue(locator: string | Locator) {
        const element = this.getElement(locator);
        return element.inputValue({ timeout: defaultTimeout });
    }

    async isElementVisible(locator: string | Locator) {
        await this.page.waitForTimeout(5000);
        const element = this.getElement(locator);
        return element.isVisible();
    }

    async containsText(locator: string, expectedText: string) {
        const textOfElem = await this.getElementText(this.getElement(locator));
        return textOfElem.includes(expectedText);
    }



}
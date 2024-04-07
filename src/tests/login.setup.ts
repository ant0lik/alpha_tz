import dotenv from 'dotenv';
import { test as setup, expect } from '@playwright/test';
import { logInPage } from '../page-objects/login-page/locators';
import { STORAGE_STATE } from '../playwright.config';
dotenv.config();

require('dotenv').config();


setup('authenticate', async ({ page }) => {
    await page.goto('https://enotes.pointschool.ru/login');
    await page.click(logInPage.lnkLogin);
    await page.locator(logInPage.inpLogin).pressSequentially(process.env.LOGIN_USERNAME);
    await page.locator(logInPage.inpPassword).pressSequentially(process.env.LOGIN_PASSWORD);
    await page.click(logInPage.btnLogIn);
    await page.context().storageState({ path: STORAGE_STATE });

});
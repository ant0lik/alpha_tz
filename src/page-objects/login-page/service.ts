import { Page } from '@playwright/test';
import { logInPage } from './locators';
import PageActions from '@page-objects/page.service';
import { notesPage } from '@page-objects/notes/locators';
import dotenv from 'dotenv';

dotenv.config();

export default class ActionsLogInPage {

    private pageActions: PageActions;

    constructor(private page: Page) {
        this.pageActions = new PageActions(page);
    }

    async clickBtnLogIn() {
        await this.pageActions.click(logInPage.btnLogIn);
    }

    async logInToPage() {
        await this.page.goto('https://enotes.pointschool.ru/login');
        await this.page.click(logInPage.lnkLogin);
        await this.pageActions.getElement(logInPage.inpLogin).pressSequentially(process.env.LOGIN_USERNAME);
        await this.pageActions.getElement(logInPage.inpPassword).pressSequentially(process.env.LOGIN_PASSWORD);
        await this.page.click(logInPage.btnLogIn);
        await this.pageActions.waitForVisibility(notesPage.txtNumITems)

    }
}
import { Page } from '@playwright/test';
import PageActions from '@page-objects/page.service';
import { notesPage } from './locators';

export default class ActionsNotesPage {

    private pageActions: PageActions;

    constructor(private page: Page) {
        this.pageActions = new PageActions(page);
    }


    async clickButtonBuyOnItemWithoutDiscount() {
        await this.page.locator(notesPage.itemWithoutDiscount).first().click();
    }

    async clickButtonBuyOnItemWithDiscount() {
        await this.page.locator(notesPage.itemWithDiscount).first().click();
    }

    async clickOnBasket() {
        await this.pageActions.click(notesPage.lnkDropdownBasket);
        await this.pageActions.waitForVisibility(this.page.locator(notesPage.mdlBasket));
    }

    async navigateToBasket() {
        await this.page.getByRole('button', { name: 'Перейти в корзину' }).click();
        await this.page.waitForURL('**/basket')
    }
}
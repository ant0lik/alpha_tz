import PageActions from '@page-objects/page.service';
import ActionsLogInPage from '@page-objects/login-page/service';
import ActionsNotesPage from '@page-objects/notes/service';
import { test as base } from '@playwright/test';

interface Fixtures {
    pageActions: PageActions;
    actionsNotesPage: ActionsNotesPage;
    actionsLoginPage: ActionsLogInPage;
};

export const test = base.extend<Fixtures>({
    pageActions: async ({ page }, use) => {
        await use(new PageActions(page));
    },
    actionsNotesPage: async ({ page }, use) => {
        await use(new ActionsNotesPage(page))
    },
    actionsLoginPage: async ({ page }, use) => {
        await use(new ActionsLogInPage(page))
    }
});

export const step = test.step;
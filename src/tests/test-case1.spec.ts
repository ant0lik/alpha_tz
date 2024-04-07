import { step, test } from '@fixtures/base_fixtures';
import { notesPage } from '@page-objects/notes/locators';
import { expect } from '@playwright/test';



test.beforeEach(async ({ page, actionsLoginPage, pageActions, actionsNotesPage }) => {
  await actionsLoginPage.logInToPage();
  expect(page.locator(notesPage.txtNumITems)).toBeVisible();
  if (!pageActions.containsText(notesPage.txtNumITems, '0')) {
    await actionsNotesPage.clickOnBasket();
    await page.getByRole('button', { name: 'Очистить корзину' }).click();
  }

});

test(
  'Test Case 1',
  async ({
    page,
    actionsNotesPage,
  }) => {

    await step('Click on Basket and validate', async () => {
      await actionsNotesPage.clickOnBasket();
      expect(page.getByLabel("Корзина"), 'Basket dialog should appear').toBeVisible()
    })

    await step('Click "Перейти в корзину" and validate', async () => {
      await actionsNotesPage.navigateToBasket()
      expect(page, 'The page should have appropriate URL').toHaveURL('/basket');
    })

  }
);

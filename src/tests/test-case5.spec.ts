import { step, test } from '@fixtures/base_fixtures';
import { notesPage } from '@page-objects/notes/locators';
import { expect } from '@playwright/test';

test.describe('Test case 5', () => {
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ page, actionsLoginPage, pageActions, actionsNotesPage }) => {
    await actionsLoginPage.logInToPage();
    expect(page.locator(notesPage.txtNumITems)).toBeVisible();
    if (!pageActions.containsText(notesPage.txtNumITems, '0')) {
      await actionsNotesPage.clickOnBasket();
      await page.getByRole('button', { name: 'Очистить корзину' }).click();
    }

  });

  test(
    'Test Case 2',
    async ({
      page,
      pageActions,
      actionsNotesPage
    }) => {

      const numOfItemsToAdd = 9;

      await step(`Add ${numOfItemsToAdd} items with discount to Basket and validate`, async () => {
        for (let _ = 0; _ < numOfItemsToAdd; _++) {
          await actionsNotesPage.clickButtonBuyOnItemWithDiscount();
        }
        await pageActions.waitForVisibility(page.getByText(numOfItemsToAdd.toString()));
        expect(page.locator(notesPage.txtNumITems)).toContainText(numOfItemsToAdd.toString());
      });

      await step('Click on Basket and validate', async () => {
        await actionsNotesPage.clickOnBasket();
      })

      await step('Click "Перейти в корзину" and validate', async () => {
        await actionsNotesPage.navigateToBasket()
        expect(page, 'The page should have appropriate URL').toHaveURL('/basket');
      })

    }
  );
})


import { step, test } from '@fixtures/base_fixtures';
import { notesPage } from '@page-objects/notes/locators';
import { expect } from '@playwright/test';

test.describe('Test case 2', () => {
  test.describe.configure({ retries: 1 });

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

      await step('Add item without discount to Basket and validate', async () => {
        await actionsNotesPage.clickButtonBuyOnItemWithoutDiscount();
        await pageActions.waitForVisibility(page.getByText('1'));
        expect(page.locator(notesPage.txtNumITems), 'Should contain 1').toContainText('1');
      });

      await step('Click on Basket and validate', async () => {
        await actionsNotesPage.clickOnBasket();
        expect(page.locator(notesPage.mdlBasket), 'Basket should be visible').toBeVisible();
      })

      await step('Click "Перейти в корзину" and validate', async () => {
        await actionsNotesPage.navigateToBasket()
        expect(page, 'The page should have appropriate URL').toHaveURL('/basket');
      })

    }
  );
})


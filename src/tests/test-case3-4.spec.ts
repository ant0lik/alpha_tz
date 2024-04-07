import { step, test } from '@fixtures/base_fixtures';
import { notesPage } from '@page-objects/notes/locators';
import { expect } from '@playwright/test';

test.describe('Test case 3 and 4', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page, actionsLoginPage, pageActions, actionsNotesPage }) => {
    await actionsLoginPage.logInToPage();
    expect(page.locator(notesPage.txtNumITems)).toBeVisible();
    if (!pageActions.containsText(notesPage.txtNumITems, '0')) {
      await actionsNotesPage.clickOnBasket();
      await page.getByRole('button', { name: 'Очистить корзину' }).click();
    }

  });


  test(
    'Test Case 3 and 4',
    async ({
      page,
      pageActions,
      actionsNotesPage
    }) => {

      const numDiscountedItems = '1';
      const numDifferentItems = '8';
      const totalNumItems = '9';

      await step('TC3: Add item with discount to Basket and validate', async () => {
        await actionsNotesPage.clickButtonBuyOnItemWithDiscount();
        await pageActions.waitForVisibility(page.getByText(numDiscountedItems));
        expect.soft(page.locator(notesPage.txtNumITems)).toContainText(numDiscountedItems);
      });

      await step('TC3: Click on Basket and validate', async () => {
        await actionsNotesPage.clickOnBasket();
      });

      await step('Click "Перейти в корзину" and validate', async () => {
        await actionsNotesPage.navigateToBasket()
        expect.soft(page, 'The page should have appropriate URL').toHaveURL('/basket');
      })

      await step(`TC4: Add ${numDifferentItems} more different items`, async () => {
        page.goto('/');
        for (let i = 1; i < 9; i++) {
          await page.locator(`(//button[contains(text(), "Купить")])[${i}]`).click();
        }
        expect.soft(page.locator(notesPage.txtNumITems)).toContainText(totalNumItems);
      });

      await step('TC3: Click on Basket and validate', async () => {
        await actionsNotesPage.clickOnBasket();
      });

      await step('Click "Перейти в корзину" and validate', async () => {
        await actionsNotesPage.navigateToBasket()
        expect.soft(page, 'The page should have appropriate URL').toHaveURL('/basket');
      })

    }
  );
})
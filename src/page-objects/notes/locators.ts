export const notesPage = {
    txtNumITems: '//*[@id="basketContainer"]/span',
    lnkDropdownBasket: '//*[@id="basketContainer"]',
    mdlBasket: '//div[@aria-labelledby="dropdownBasket"]',
    itemWithoutDiscount: "div > .note-item:not(.hasDiscount) > .card-body > .actionBuyProduct",
    itemWithDiscount: "div > .note-item.hasDiscount > .card-body > .actionBuyProduct"
};
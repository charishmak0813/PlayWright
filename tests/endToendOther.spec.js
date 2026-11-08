const { test, expect } = require("@playwright/test");

test("end  to end test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "testchar@gmail.com";
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("test@Char21");
  await page.getByRole("button", { name: "login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await page
    .getByRole("listItem")
    .getByRole("button", { name: "cart" })
    .click();
  await page.locator("div li").first().waitFor();
  // isVisible() doesnt have auto wait, unlike click() so we are waiti ng till we see div li elements on the page when the page loaded we check the isVisible()
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.getByRole("button", { name: "Checkout" }).click();
  const creditCardInput = page
    .locator(".field", { hasText: "Credit Card Number" })
    .locator("input");

  await creditCardInput.fill("4111 1111 1111 1111");

  const emailInput = page.locator(
    ".details__user .user__name > input[type='text']"
  );

  await expect(emailInput).toBeVisible();
  await emailInput.fill("testchar@gmail.com");
  await page
    .getByPlaceholder("Country")
    .pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  await page.getByRole("button", { name: "India" }).nth(1).click();

  await page.getByText("PLACE ORDER").click();

  await expect(page.getByText(" Thankyou for the order. ")).isVisible();
  // const orderId = await page
  //   .locator(".em-spacer-1 .ng-star-inserted")
  //   .textContent();
  // console.log(orderId);
  // await page.locator("button[routerlink *='myorders']").click();
  // await page.locator("tbody").waitFor();

  // const rows = page.locator("tbody tr");

  // for (let i = 0; i < (await rows.count()); i++) {
  //   const rowOrderId = await rows.nth(i).locator("th").textContent();
  //   if (orderId.includes(rowOrderId)) {
  //     await rows.nth(i).locator("button").first().click();
  //     break;
  //   }
  // }
  // //await page.pause();
  // const orderIdDetails = await page.locator(".col-text").textContent();
  // expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

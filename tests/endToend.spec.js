const { test, expect } = require("@playwright/test");

test("end  to end test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "testchar@gmail.com";
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("test@Char21");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  // await page.pause();
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  // isVisible() doesnt have auto wait, unlike click() so we are waiti ng till we see div li elements on the page when the page loaded we check the isVisible()
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  const creditCardInput = page
    .locator(".field", { hasText: "Credit Card Number" })
    .locator("input");

  await expect(creditCardInput).toBeVisible();
  await creditCardInput.fill("4111 1111 1111 1111");
  const expiryField = page.locator(".field", { hasText: "Expiry Date" });

  const expiryMonth = expiryField.locator("select").nth(0);
  const expiryYear = expiryField.locator("select").nth(1);
  await expect(expiryMonth).toBeVisible();
  await expect(expiryYear).toBeVisible();

  await expiryMonth.selectOption("05"); // May
  await expiryYear.selectOption("20"); // Year

  const cvv = page.locator(".field.small", { hasText: "CVV Code " });
  await expect(cvv).toBeVisible();
  await cvv.locator('[type="text"]').fill("121");

  const nameOnCard = page.locator(".field", { hasText: "Name on Card " });
  await expect(nameOnCard).toBeVisible();
  await nameOnCard.locator('[type="text"]').fill("TestChar");

  const emailInput = page.locator(
    ".details__user .user__name > input[type='text']"
  );

  await expect(emailInput).toBeVisible();
  await emailInput.fill("testchar@gmail.com");
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text == " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );

  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await page.locator("button[routerlink *='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  //await page.pause();
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

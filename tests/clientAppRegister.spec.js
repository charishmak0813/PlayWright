const { test, expect } = require("@playwright/test");

test("Client playwight test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const firstName = page.locator("#firstName");
  const lastName = page.locator("#lastName");
  const email = page.locator("##userEmail");
  const phone = page.locator("#userMobile");

  const password = page.locator("#userPassword");
  const signInBtn = page.locator("#login");
  const cardTitles = page.locator(".card-body b");
  console.log(await page.title());

  await userName.fill("testchar@gmail.com");
  await password.fill("test@Char21");
  await signInBtn.click();
  console.log(await cardTitles.first().textContent());
  await page.locator(".card-body b").first().waitFor();
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

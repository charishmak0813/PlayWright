const { test, expect } = require("@playwright/test");
// Browser and Page fixtures are available by default in Playwright test. We can use them without creating a new context and page. But if we want to create a new context and page we can use browser fixture to create a new context and page.

// test on date 11/06/2026
test("To set the browser context with plugins and cookies", async ({
  browser,
}) => {
  const context = await browser.newContext;
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
});
// test on date 11/06/2026
test("Assuming the browser context is not required and it is new and opening the page", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Browser context playwight test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("[type ='password']"); // attribute selector  <input type="password" class="form-control" id="password" placeholder="Password">
  const signInBtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //await userName.fill("rahulshetty");
  //await password.fill("learning");
  //await signInBtn.click();
  //console.log(await page.locator("[style*='block']").textContent());
  //await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("first playwight test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await expect(page).toHaveTitle("Google");
  console.log(await page.title());
});
test.only("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  const douc = page.locator("[href *='document-request']");
  //await page.pause();
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  expect(await page.locator(".radiotextsty").last()).toBeChecked();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await page.locator("#terms").click();
  await expect(await page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  // await page.locator("#signInBtn").click();
  await expect(douc).toHaveAttribute("class", "blinkingText");
});

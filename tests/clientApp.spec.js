const { test, expect } = require("@playwright/test");

test("Client playwight test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signInBtn = page.locator("[value = 'Login']");
  const cardTitles = page.locator(".card-body b");
  console.log(await page.title());

  await userName.fill("testchar@gmail.com");
  await password.fill("test@Char21");
  await signInBtn.click();
  //await page.waitForLoadState("networkidle");

  // await page.locator(".card-body b").first().waitFor();
  await expect(cardTitles.first()).toBeVisible();
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  //await page.pause();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  const docuLink = page.locator("[href*='documents-request']");
  await expect(docuLink).toHaveAttribute("class", "blinkingText");
});

test.only("Child window handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const docuLink = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    docuLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  await page.locator("#username").fill(domain);

  // console.log(await page.locator("#username").textContent());
  console.log(await page.locator("#username").inputValue()); // When the text is not on DOM or when we enter programatticaly we get it with inputValue.
});

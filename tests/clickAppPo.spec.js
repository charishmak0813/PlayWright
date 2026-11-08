const { test, expect } = require("@playwright/test");
const { parseEnv } = require("util");

test("Playwright special locators", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female"); // selectOption is only for the select tag.
  await page.getByPlaceholder("Password").fill("testChar");
  await page.getByRole("button", { name: "Submit" }).click();
  const successMsg = await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  await expect(successMsg).toBeTruthy();
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});

// use npx playwright test --ui  in the terminal for the execution.

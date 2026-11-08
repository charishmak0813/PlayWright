const { test, expect } = require("@playwright/test");

test("sign up", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/");

  const signupPagePromise = page.context().waitForEvent("page");
  await page.getByRole("link", { name: "Sign Up", exact: true }).click();
  const signupPage = await signupPagePromise;

  await signupPage.waitForLoadState();
  await expect(signupPage).toHaveURL(
    /sso\.teachable\.com\/secure\/9521\/identity\/sign_up/,
  );

  console.log("URL:", signupPage.url());
  console.log("Title:", await signupPage.title());

  // Use locators against signupPage, not page.
  console.log(
    await signupPage.locator("input").evaluateAll((inputs) =>
      inputs.map((input) => ({
        name: input.name,
        type: input.type,
        placeholder: input.placeholder,
        testId: input.getAttribute("data-testid"),
        ariaLabel: input.getAttribute("aria-label"),
      })),
    ),
  );
});

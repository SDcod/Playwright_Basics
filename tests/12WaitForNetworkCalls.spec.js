import test, { expect } from "@playwright/test";

test("wait for page to load", async ({ page }) => {
  await page.goto("https://freelance-learn-automation.vercel.app/login");

  await page.locator("//a[text()='New user? Signup']").click();

  await page.waitForLoadState("networkidle");

  await page.waitForSelector("//input[@type='radio']");

  let count = await page.locator("//input[@type='radio']").count();

  expect(count).toBe(2);
});

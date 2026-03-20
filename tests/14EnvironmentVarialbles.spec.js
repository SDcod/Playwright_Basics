import { test, expect } from "@playwright/test";

test.describe("Environment variables examples", () => {
  test("local .env", async ({ page }) => {
    let baseUrl = process.env.BASE_URL;
    let username = process.env.APP_USERNAME;

    await page.goto(baseUrl);
    await page.waitForLoadState("domcontentloaded");
    expect(page).toHaveTitle("OrangeHRM");
    await page.getByPlaceholder("Username").fill(username);
  });
});

import test from "@playwright/test";

import data from "../test-data/login-data";

test.describe("Login Test data suite", () => {
  data.forEach((user) => {
    test(`login with username: ${user.username}`, async ({ page }) => {
      await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );

      await page.getByPlaceholder("Username").fill(user.username);

      await page.locator("//input[@name='password']").fill(user.password);
    });
  });
});

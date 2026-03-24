// What are Fixtures in Playwright?

// 👉 Fixtures are predefined setup objects that Playwright gives to your test.

// Example:

// test('example', async ({ page }) => {
//   await page.goto('https://example.com');
// });

// 👉 Here:

// page = fixture
// Provided automatically by Playwright
// 🔹 Built-in Fixtures

// Some common ones:

// page → browser tab
// browser → browser instance
// context → browser context
// request → API client

import { test, expect } from "../fixtures/testUser";

test.describe("Fixtures guide", () => {
  test("create user via API and verify UI", async ({ request, page }) => {
    const response = await request.post("/api/users", {
      data: { name: "Swaroop" },
    });

    const user = await response.json();

    await page.goto("/users");

    await expect(page.locator(`text=${user.name}`)).toBeVisible();
  });

  test("two users chatting", async ({ browser }) => {
    const user1Context = await browser.newContext();
    const user2Context = await browser.newContext();

    const user1Page = await user1Context.newPage();
    const user2Page = await user2Context.newPage();

    await user1Page.goto("/chat");
    await user2Page.goto("/chat");
  });

  test("custom fixture", async ({ page, testUser }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill(testUser.username);
    await page.getByPlaceholder("Password").fill(testUser.password);
  });
});

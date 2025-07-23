import { test, expect } from "@playwright/test";

test("hover over element", async ({ page }) => {
  await page.goto("https://freelance-learn-automation.vercel.app/login");

  await page.getByPlaceholder("Enter Email").fill("admin@email.com");
  await page.getByPlaceholder("Enter Password").fill("admin@123");
  await page.getByRole("button", { name: "Sign in" }).click();
  
  await page.locator('//span[text()="Manage"]').hover();

  await page.getByRole("link", { name: "Manage Courses" }).click();

  let pageUrl = await page.url();
  expect(pageUrl).toBe(
    "https://freelance-learn-automation.vercel.app/course/manage"
  );
});

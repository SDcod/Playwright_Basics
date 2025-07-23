import { test, expect } from "@playwright/test";

test("navigate and validate title", async ({ page }) => {
  await page.goto(
    "https://playwright.dev/docs/running-tests#run-specific-tests"
  );

  const pageurl = page.url();

  console.log(pageurl);

  //   await page.waitForLoadState(); //The promise resolves after 'load' event.
  //   const title = await page.title();
  //   expect(title).toMatch("Running and debugging tests | Playwright");

  await expect(page).toHaveTitle("Running and debugging tests | Playwright"); //recommended way
});

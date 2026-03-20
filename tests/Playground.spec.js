import test from "@playwright/test";

test.describe("test grid io scenario", () => {
  test("login and validate links", async ({ page }) => {
    await page.goto("https://testgrid.io/");
    await page.waitForLoadState("load");

    await page.waitForTimeout(6000);
    const initialModal = page.locator('div[class^="demo_modal_modal"]');

    if (initialModal.isVisible({ timeout: 6000 }).catch(() => false)) {
      console.log("Modal is visible, closing it...");
      await page.getByRole("button", { name: "close" }).click();
    } else {
      console.log("Modal not visible, skipping close action.");
    }
  });
});

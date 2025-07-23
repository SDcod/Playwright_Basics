import { test, expect } from "@playwright/test";
test("Navigate to Google, search Cypress docs, and validate domain", async ({
  page,
}) => {
  // Navigate to Google
  await page.goto("https://www.google.com");

  // Accept cookies if the dialog appears (common in some regions)
  try {
    const acceptButton = page.getByRole("button", { name: /accept|agree/i });
    if (await acceptButton.isVisible()) await acceptButton.click();
  } catch (error) {
    // Continue if no cookie dialog appears
  }

  // Type search query and press enter
  await page.getByRole("combobox", { name: "Search" }).fill("cypress docs");
  await page.keyboard.press("Enter");

  // Wait for search results and click the first result
  await page.waitForLoadState("networkidle");
  await page
    .getByRole("link", { name: /cypress/i })
    .first()
    .click();

  // Wait for navigation and verify the URL domain
  await page.waitForLoadState("networkidle");
  const url = new URL(page.url());
  await expect(url.hostname).toBe("docs.cypress.io");
});

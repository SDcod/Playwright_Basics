import { test } from "@playwright/test";

test("auto suggestion combobox using manual traversal", async ({ page }) => {
  await page.goto("https://www.google.com/");

  const searchBox = page.getByRole("combobox", { name: "Search" });
  await searchBox.fill("Playwright exampl"); // faster than keyboard.type()

  await page.waitForSelector('//li[@role="presentation"]');

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
});

test("auto suggestion combobox using loop", async ({ page }) => {
  await page.goto("https://www.google.com/");

  const searchBox = page.getByRole("combobox", { name: "Search" });
  await searchBox.fill("Playwright example"); // faster than keyboard.type()

  await page.waitForSelector('//li[@role="presentation"]');

  let searchResults = await page.$$('//li[@role="presentation"]');

  if (searchResults.length > 0) {
    for (let result of searchResults) {
      let text = await result.textContent();
      if (text.includes("python")) {
        await result.click();
        break;
      }
    }
  } else {
    console.log("no search results");
  }

  await page.waitForLoadState("domcontentloaded");
});

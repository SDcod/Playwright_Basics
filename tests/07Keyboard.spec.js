import { test } from "@playwright/test";

test("keyboard actions - type,press", async ({ page }) => {
  await page.goto("https://www.google.com/");

  await page.getByTitle("Search").focus();

  await page.keyboard.type("Hello Playwright");

  await page.waitForTimeout(2000);
  await page.keyboard.press("ControlOrMeta+A");
  await page.waitForTimeout(2000);
  await page.keyboard.press("Backspace");
  await page.waitForTimeout(2000);
});

test("keyboard actions – down, up", async ({ page }) => {
  await page.goto("https://www.google.com/");

  const searchBox = page.getByRole("combobox", { name: "Search" });
  await searchBox.fill("Hello World"); // faster than keyboard.type()

  // hold Shift and walk the caret left 5× to select “World”
  await page.keyboard.down("Shift");
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("ArrowLeft");
  }
  await page.keyboard.up("Shift");

  await page.keyboard.press("Backspace"); // deletes the selected word
  await page.keyboard.press("Enter"); // submits the search
});

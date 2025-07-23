import { test, expect } from "@playwright/test";

test("upload a file", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download");

  await page.locator("#uploadFile").setInputFiles("./files/Hello.txt");

  let resultText = await page.locator("#uploadedFilePath").textContent();

  expect(resultText).toBe("C:\\fakepath\\Hello.txt");
});

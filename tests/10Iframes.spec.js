import test from "@playwright/test";

test("handle single iframe", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Frames.html");

  const iframelocator = page.frameLocator("#singleframe");

  await iframelocator.locator("input").fill("text inside iframe");
});

test("handle nested iframe", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Frames.html");

  await page.getByRole("link", { name: "Iframe with in an Iframe" }).click();

  const nestedIframelocator = page
    .frameLocator('iframe[src="MultipleFrames.html"]')
    .frameLocator('iframe[src="SingleFrame.html"]');

  await nestedIframelocator.locator("input").fill("text inside nested iframe");
});

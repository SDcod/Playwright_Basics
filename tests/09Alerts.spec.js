import test, { expect } from "@playwright/test";

test("Dialog - Alert", async ({ page }) => {
  await page.goto("https://practice-automation.com/popups/");

  page.on("dialog", async (d) => {
    expect(d.type()).toContain("alert"); //checks the type of dialouge whose type is alert
    expect(d.message()).toContain("Hi there, pal!");
    await d.accept();
  });

  await page.locator("#alert").click();
});

test("Dialog - Confirm - Accept", async ({ page }) => {
  await page.goto("https://practice-automation.com/popups/");

  page.on("dialog", async (d) => {
    expect(d.type()).toContain("confirm"); //checks the type of dialouge whose type is alert
    expect(d.message()).toContain("OK or Cancel, which will it be?");
    await d.accept();
  });

  await page.locator("#confirm").click();

  await expect(page.locator("#confirmResult")).toHaveText("OK it is!");
});

test("Dialog - Confirm - Dismiss", async ({ page }) => {
  await page.goto("https://practice-automation.com/popups/");

  page.on("dialog", async (d) => {
    expect(d.type()).toContain("confirm"); //checks the type of dialouge whose type is alert
    expect(d.message()).toContain("OK or Cancel, which will it be?");
    await d.dismiss();
  });

  await page.locator("#confirm").click();

  await expect(page.locator("#confirmResult")).toHaveText("Cancel it is!");
});

test("Dialog - prompt - accept", async ({ page }) => {
  await page.goto("https://practice-automation.com/popups/");

  page.on("dialog", async (d) => {
    expect(d.type()).toContain("prompt"); //checks the type of dialouge whose type is alert
    expect(d.message()).toContain("Hi there, what's your name?");
    await d.accept("John Doe");
  });

  await page.locator("#prompt").click();

  await expect(page.locator("#promptResult")).toHaveText(
    "Nice to meet you, John Doe!"
  );
});

test("Dialog - prompt - dismiss", async ({ page }) => {
  await page.goto("https://practice-automation.com/popups/");

  page.on("dialog", async (d) => {
    expect(d.type()).toContain("prompt"); //checks the type of dialouge whose type is alert
    expect(d.message()).toContain("Hi there, what's your name?");
    await d.dismiss();
  });

  await page.locator("#prompt").click();

  await expect(page.locator("#promptResult")).toHaveText(
    "Fine, be that way..."
  );
});

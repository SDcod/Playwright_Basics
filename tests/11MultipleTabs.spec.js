//navigate https://freelance-learn-automation.vercel.app/login
//click on facebook link, it opens new tab
//fill email details on fb login page. (//a[contains(@href,'facebook')])[1]
//close new tab and navigate back to main page

import test from "@playwright/test";

test("handle multiple tabs", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://freelance-learn-automation.vercel.app/login");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("(//a[contains(@href,'facebook')])[1]").click(),
  ]);

  await newPage
    .locator("input[name='email']:nth-child(2)")
    .fill("dummyemail@test.com");

  await newPage.waitForTimeout(3000);
});

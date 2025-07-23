import { expect, test } from "@playwright/test";

//explicitly configure viewport
test.use({ viewport: { height: 720, width: 1366 } });

test("valid login test", async ({ page }) => {
  //navigate to the url
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //newly released methods to access webelements
  await page.getByPlaceholder("Username").fill("Admin");

  //classic way of accessing webelements
  await page.locator("//input[@name='password']").fill("admin123");

  await page.locator("//button[@type='submit']").click();

  //reduce test flakiness by waiting for full page load
  await page.waitForLoadState();

  //assertion using expect, (playwright uses expect library from jest for assertions)
  await expect(page).toHaveURL(/dashboard/);
  await page
    .locator(
      "//span[@class='oxd-userdropdown-tab']/img[@alt='profile picture']"
    )
    .click();

  //chain locators to access elements by text
  await page.locator("[role='menu'] li").getByText("Logout").click();

  await expect(page).toHaveURL(/login/);
});

test("Invalid login test", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  await page.getByPlaceholder("Username").fill("Adminabc");

  await page.locator("//input[@name='password']").fill("admin12345");

  await page.locator("//button[@type='submit']").click();

  //access text of the element to validate in further steps
  let errorMessage = await page
    .locator(".oxd-alert-content-text")
    .textContent();

  expect(errorMessage).toBe("Invalid credentials");
  //   expect(errorMessage.includes("Invalid")).toBeTruthy();
});

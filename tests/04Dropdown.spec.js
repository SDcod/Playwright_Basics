import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://freelance-learn-automation.vercel.app/signup");
});

test("dropdown select - using selectOption", async ({ page }) => {
  await page.locator("#state").selectOption({ label: "Arunachal Pradesh" });

  //get all text content inside select
  const AllValues = await page.locator("#state").textContent();

  console.log("All states in dropdown : " + AllValues);
  //assert that list includes "Maharashtra".

  await expect(AllValues.includes("Maharashtra")).toBeTruthy;
});

test("dropdown list validation - using forloop", async ({ page }) => {
  //$ - get the element matching the locator.
  let stateDropdown = await page.$("#state");

  //$$ - returns an array of matching elements under the chained element .
  let dropdownValues = await stateDropdown.$$("option");

  let stateExist = false;
  //for loop to check if list includes Maharashtra

  for (let i = 0; i < dropdownValues.length; i++) {
    let currentElement = dropdownValues[i];

    let elementText = await currentElement.textContent();

    if (elementText === "Maharashtra") {
      stateDropdown = true;
      break;
    }
  }
  await expect(stateExist).toBeTruthy();
});

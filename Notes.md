install:
npm init playwright@latest

run tests:
    headless mode- run all tests
    npx playwright test

    headed mode- 
    npx playwright test --headed

    headed mode with specific browser- 
    npx playwright test --headed --project chromium

    ui mode- 
    npx playwright test --ui

    headed mode with specific test file
    npx playwright test ./path/of/the/file --headed

  Helpful CLI commands for playwright
    //to get help for the available cli commands
    npx playwright --help 

    //to get help for specific command 'test' in this case and it's all options
    npx playwright test --help 

    //run with specific browser
    npx playwright test ./path/of/the/file --headed --project="google chrome"
      

folder structure:
    tests folder: This folder contains actual test scripts. By default, an example.spec.ts file will be created inside this folder.
    package.json and package-lock.json: This file helps to track dependencies, create a shortcut for running tests, etc.
    playwright.config.js: This is the global configuration file for the Playwright, which you can configure with available options.
    package.json and package-lock.json: This file helps to track dependencies, create a shortcut for running tests, etc.


example.spec.js:
    // @ts-check
    //Playwright Test provides a test function to declare tests and expect function to write assertions.
    //Playwright uses Jest library in background to handle assertions
    
    import { test, expect } from '@playwright/test';

    //"page" is a fixture :Playwright Test is based on the concept of the test fixtures. Test fixtures are used to establish environment for each test, giving the test everything it needs and nothing else.
    //other fixtures {browser,browserName,context,request}
    
    test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
    });

    test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });

    //fill the input text
    await page.getByPlaceholder("Username").fill("Adminabc");

    //dropdown handling
        //select by using text on option
        await page.locator("#state").selectOption({ label: "Arunachal Pradesh" });

        //select by using value on option
        await page.locator("#state").selectOption({ value: "Arunachal Pradesh" });

        //get all text content inside select
         const AllValues = await page.locator("#state").textContent();

    //howver handling
        await page.locator('//span[text()="Manage"]').hover();

    //UploadFile
        await page.locator("#uploadFile").setInputFiles("./files/Hello.txt");

    //Keyboard press
        await page.getByTitle("Search").focus();
        //type text into focused element.
        await page.keyboard.type("Hello Playwright");
        //select all text
        await page.keyboard.press("ControlOrMeta+A");

    //Alert handling
        test("Dialog - Alert", async ({ page }) => {
            await page.goto("https://practice-automation.com/popups/");

            page.on("dialog", async (d) => {
            expect(d.type()).toContain("alert"); //for confirm toContain("confirm"), for prompt toContain("prompt")
            expect(d.message()).toContain("Hi there, pal!");
            await d.accept(); //to dismiss d.dismiss(), for prompt d.accept("prompt text")
            });

            await page.locator("#alert").click();
        });

    //iFrame handling
        await page.goto("https://demo.automationtesting.in/Frames.html");
        const iframelocator = page.frameLocator("#singleframe");
        await iframelocator.locator("input").fill("text inside iframe");



// Allure Report with Playwright [Screenshots, Videos & Traces]
Step1: Install Allure Report command-line tool

npm install -g --save-dev allure-commandline
Step2: Install the Allure Playwright adapter.

npm install --save-dev allure-playwright
Step3: Add below config in playwright.config.js file.

reporter:[
['html'],
['allure-playwright']
],
Step4: Run Playwright tests.

npx playwright test
Step5: Generate Allure Report

npx allure serve allure-results
or

allure generate allure-results --clean
allure open
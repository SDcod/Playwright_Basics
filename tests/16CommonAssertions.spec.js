import { test, expect } from '@playwright/test';

test.describe('16CommonAssertions', () => {
  test('Page URL and Title Assertions', async ({ page }) => {
    // 1. Navigate to https://example.com
    await page.goto('https://example.com');
    // Verify page URL is https://example.com/
    await expect(page).toHaveURL('https://example.com/');
    // Verify page title is Example Domain
    await expect(page).toHaveTitle('Example Domain');
  });

  test('Locator Visibility and Text Assertions', async ({ page }) => {
    // 1. Navigate to https://example.com
    await page.goto('https://example.com');
    // Verify h1 element is visible
    await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
    // Verify h1 has text 'Example Domain'
    await expect(page.getByRole('heading', { name: 'Example Domain' })).toHaveText('Example Domain');
    // Verify h1 contains text 'Example'
    await expect(page.getByRole('heading', { name: 'Example Domain' })).toContainText('Example');
  });

  test('Locator Value and State Assertions', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/checkboxes
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    // Verify first checkbox is not checked
    await expect(page.getByRole('checkbox').first()).not.toBeChecked();
    // Verify second checkbox is checked
    await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
    // Verify first checkbox is enabled
    await expect(page.getByRole('checkbox').first()).toBeEnabled();
    // Verify first checkbox is editable
    await expect(page.getByRole('checkbox').first()).toBeEditable();
  });

  test('Locator Attribute and CSS Assertions', async ({ page }) => {
    // 1. Navigate to https://example.com
    await page.goto('https://example.com');
    // Verify link has href attribute 'https://www.iana.org/domains/example'
    await expect(page.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', 'https://iana.org/domains/example');
    // Verify link has CSS color 'rgb(0, 0, 238)'
    await expect(page.getByRole('link', { name: 'Learn more' })).toHaveCSS('color', 'rgb(51, 68, 136)');
  });

  test('Locator Count and Focus Assertions', async ({ page }) => {
    // 1. Navigate to https://example.com
    await page.goto('https://example.com');
    // Verify paragraphs count is 2
    await expect(page.locator('p')).toHaveCount(2);
  });

  test('API Response Assertions', async ({ request }) => {
    // 1. Make GET request to https://jsonplaceholder.typicode.com/posts/1
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    // Verify response is OK
    await expect(response).toBeOK();
    // Verify response JSON has property 'id' with value 1
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
  });

  test('Screenshot Assertions', async ({ page }) => {
    // 1. Navigate to https://example.com
    await page.goto('https://example.com');
    // Verify page screenshot matches
    await expect(page).toHaveScreenshot();
    // Verify h1 screenshot matches
    await expect(page.getByRole('heading', { name: 'Example Domain' })).toHaveScreenshot();
  });
});
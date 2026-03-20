import { expect, test } from "@playwright/test";
import data from "../test-data/login-data";

test("GET request test", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/todos/1",
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
});

test("POST request test", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );
  expect(response.status()).toBe(201);
  const body = await response.json();
  console.log(body);
});

test("PUT request test", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      data: {
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
});

test("DELETE request test", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  expect(response.status()).toBe(200);
  expect(response.body()).toMatchObject({});
  const body = await response.json();
  console.log(body);
});

test("Mock requests", async ({ page }) => {
  await page.route("**/api/users", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [{ name: "Mock User" }],
      }),
    });
  });
});

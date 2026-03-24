import { test as base } from "@playwright/test";

export const test = base.extend({
  testUser: async ({}, use) => {
    const user = {
      username: "SD test",
      password: "pass1234",
    };

    await use(user);
  },
});

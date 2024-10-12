import { test, expect } from "@playwright/test";
import { version as uuidVersion } from "uuid";

import { getScreenshotPath } from "../utils/getScreenshotPath";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:9000");
  await expect(page).toHaveTitle(/UMT/);
});

test("typing in the input and clicking the greet button", async ({ page }) => {
  await page.goto("http://localhost:9000/");
  await page.screenshot({ path: getScreenshotPath("home.png") });

  const usernameLabel = page.getByTestId("username-label");
  expect(await usernameLabel.textContent()).toBe("Username");

  const usernameDescription = page.getByTestId("username-description");
  expect(await usernameDescription.textContent()).toBe(
    "This is your public display name.",
  );

  const usernameInput = page.getByTestId("username-input");
  expect(await usernameInput.getAttribute("placeholder")).toBe("shadcn");

  const greetButton = page.getByTestId("greet-button");
  expect(await greetButton.textContent()).toBe("Greet");

  await usernameInput.click();
  await page.keyboard.type("t");

  await greetButton.click();

  const usernameError = page.getByTestId("username-error");
  expect(await usernameError.textContent()).toBe(
    "Username must be at least 2 characters.",
  );

  await usernameInput.click();
  await page.keyboard.type("est");

  await greetButton.click();

  const greetMessage = page.getByTestId("greet-message");

  expect(await greetMessage.textContent()).toBe("Not running in Tauri.");
});

test("uuid v4", async ({ page }) => {
  await page.goto("http://localhost:9000");
  await page.waitForTimeout(3000);
  const rocketApiUuidV4 = page.getByTestId("rocket-api-uuid-v4");
  const rocketApiUuidV4Text = await rocketApiUuidV4.textContent();
  expect(uuidVersion(rocketApiUuidV4Text || "")).toBe(4);
});

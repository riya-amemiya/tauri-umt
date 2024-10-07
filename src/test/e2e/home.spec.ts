import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:9000");
  await expect(page).toHaveTitle(/UMT/);
});

test("typing in the input and clicking the greet button", async ({ page }) => {
  await page.goto("http://localhost:9000/");

  const usernameLabel = page.getByTestId("username-label");
  expect(await usernameLabel.textContent()).toBe("Username");

  const usernameDescription = page.getByTestId("username-description");
  expect(await usernameDescription.textContent()).toBe(
    "This is your public display name.",
  );

  const usernameInput = page.getByTestId("username-input");
  expect(await usernameInput.getAttribute("placeholder")).toBe("shadcn");

  await usernameInput.click();
  await page.keyboard.type("test");

  const greetButton = page.getByTestId("greet-button");
  expect(await greetButton.textContent()).toBe("Greet");

  await greetButton.click();
  const greetMessage = page.getByTestId("greet-message");

  expect(await greetMessage.textContent()).toBe("Not running in Tauri.");
});

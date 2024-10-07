import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:9000");
  await expect(page).toHaveTitle(/UMT/);
});

test("typing in the input and clicking the greet button", async ({ page }) => {
  await page.goto("http://localhost:9000/");
  await page.getByTestId("username").click();
  await page.keyboard.type("test");
  await page.getByRole("button", { name: "Greet" }).click();
  await page.getByText("Not running in Tauri.").click();
});

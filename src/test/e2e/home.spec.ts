import { test, expect } from "@playwright/test";

import { getScreenshotPath } from "../utils/getScreenshotPath";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:9000");
  await expect(page).toHaveTitle(/UMT/);
});

test("typing in the input and clicking the greet button", async ({ page }) => {
  await page.goto("http://localhost:9000/");
  await page.screenshot({ path: getScreenshotPath("home.png") });

  const expressionLabel = page.getByTestId("expression-label");
  expect(await expressionLabel.textContent()).toBe("Expression");

  const expressionDescription = page.getByTestId("expression-description");
  expect(await expressionDescription.textContent()).toBe(
    "Enter a mathematical expression to calculate",
  );

  const expressionInput = page.getByTestId("expression-input");
  expect(await expressionInput.getAttribute("placeholder")).toBe("1+1");

  const runCalculatorButton = page.getByTestId("run-calculator-button");
  expect(await runCalculatorButton.textContent()).toBe("Run Calculator");

  await expressionInput.click();
  await page.keyboard.type("a");

  await runCalculatorButton.click();

  const expressionError = page.getByTestId("expression-error");
  expect(await expressionError.textContent()).toBe("Invalid expression");

  await expressionInput.click();
  await page.keyboard.press("Backspace");
  await page.keyboard.type("1+1");

  await runCalculatorButton.click();

  await page.waitForSelector("[data-testid=calculator-message]");

  const expressionMessage = page.getByTestId("calculator-message");

  expect(await expressionMessage.textContent()).toBe("2");
});

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
  expect(await runCalculatorButton.textContent()).toBe("=");

  await expressionInput.click();
  await page.keyboard.type("a");

  await runCalculatorButton.click();

  const expressionError = page.getByTestId("expression-error");
  expect(await expressionError.textContent()).toBe("Invalid expression");

  const acButton = page.getByTestId("calculator-input-button-ac");
  expect(await acButton.textContent()).toBe("ac");

  await acButton.click();

  const oneButton = page.getByTestId("calculator-input-button-1");
  await oneButton.click();

  const plusButton = page.getByTestId("calculator-input-button-+");
  await plusButton.click();

  await oneButton.click();

  await runCalculatorButton.click();

  await page.waitForSelector("[data-testid=calculator-message]");

  const expressionMessage = page.getByTestId("calculator-message");

  expect(await expressionMessage.textContent()).toBe("2");
});

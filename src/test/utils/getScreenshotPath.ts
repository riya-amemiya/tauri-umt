// biome-ignore lint/correctness/noNodejsModules: <explanation>
import path from "node:path";

export const screenshotPath = "./test-results/screenshots";

export const getScreenshotPath = (screenShotName: string) => {
  return path.join(screenshotPath, screenShotName);
};

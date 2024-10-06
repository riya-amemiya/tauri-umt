// isApp.test.ts

import { isApp } from "@/utils/isApp";

describe("isApp", () => {
  it('should return true if userAgent includes "TauriApp"', () => {
    const originalUserAgent = window.navigator.userAgent;
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TauriApp",
      writable: true,
    });

    expect(isApp()).toBe(true);

    // Reset userAgent to its original value
    Object.defineProperty(window.navigator, "userAgent", {
      value: originalUserAgent,
      writable: true,
    });
  });

  it('should return false if userAgent does not include "TauriApp"', () => {
    const originalUserAgent = window.navigator.userAgent;
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      writable: true,
    });

    expect(isApp()).toBe(false);

    // Reset userAgent to its original value
    Object.defineProperty(window.navigator, "userAgent", {
      value: originalUserAgent,
      writable: true,
    });
  });
});

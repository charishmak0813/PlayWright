// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";

const config = {
  testDir: "./tests",
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "on",
  },
};

module.exports = config;

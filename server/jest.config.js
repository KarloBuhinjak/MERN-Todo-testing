module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  testMatch: ["**/tests/**/*.test.js"],

  testTimeout: 30000,

  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Todo API Test Report",
        outputPath: "reports/test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
};

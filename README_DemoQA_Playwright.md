# DemoQA Playwright Project

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of [DemoQA](https://demoqa.com).

## Getting Started

- To run all tests:
  ```pwsh
  npx playwright test
  ```
- To run tests in UI mode:
  ```pwsh
  npx playwright test --ui
  ```
- To run tests in debug mode:
  ```pwsh
  npx playwright test --debug
  ```

## Example Test

See `tests/example.spec.ts` for a sample test.

## Project Structure

- `tests/` - End-to-end test files
- `playwright.config.ts` - Playwright configuration

## Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [DemoQA](https://demoqa.com)

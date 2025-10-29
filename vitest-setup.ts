import { beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./src/mocks/server";
import "@testing-library/jest-dom/vitest";

// start the server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
// also runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// clean up after the tests are finished
afterAll(() => {
  server.close();
});

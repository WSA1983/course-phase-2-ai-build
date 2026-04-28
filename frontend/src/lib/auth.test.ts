import { AUTH_STORAGE_KEY, isValidCredentials, readSession, writeSession } from "./auth";

describe("auth utils", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("validates demo credentials", () => {
    expect(isValidCredentials("user", "password")).toBe(true);
    expect(isValidCredentials("user", "wrong")).toBe(false);
  });

  it("reads and writes session state", () => {
    expect(readSession()).toBe(false);
    writeSession(true);
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBe("true");
    expect(readSession()).toBe(true);
    writeSession(false);
    expect(readSession()).toBe(false);
  });
});

export const DEMO_USERNAME = "user";
export const DEMO_PASSWORD = "password";
export const AUTH_STORAGE_KEY = "pm.authenticated";

export const isValidCredentials = (username: string, password: string) =>
  username === DEMO_USERNAME && password === DEMO_PASSWORD;

export const readSession = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

export const writeSession = (authenticated: boolean) => {
  if (typeof window === "undefined") {
    return;
  }

  if (authenticated) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

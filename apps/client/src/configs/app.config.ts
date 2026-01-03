import { ENV } from "./env";

/**
 * App Configuration
 * General application settings
 */

export const APP_CONFIG = {
  NAME: ENV.APP_NAME,
  VERSION: ENV.APP_VERSION,
  DEFAULT_LANGUAGE: "en",
  SUPPORTED_LANGUAGES: ["en", "vi"],
  THEME: {
    DEFAULT: "light",
    STORAGE_KEY: "talent-iq-theme",
  },
  AUTH_TOKEN_KEY: "token",
  REFRESH_TOKEN_KEY: "refresh_token",
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 25,
    PAGE_SIZE_OPTIONS: [25, 50, 100, 250, 500],
  },
} as const;

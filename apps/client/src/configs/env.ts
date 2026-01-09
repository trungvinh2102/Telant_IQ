/**
 * Environment Configuration
 * Validates and exports environment variables
 */

export const ENV = {
  NODE_ENV: import.meta.env.MODE || "development",
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  API_URL: import.meta.env.VITE_API_URL || "/api",
  APP_NAME: import.meta.env.VITE_APP_NAME || "Talent IQ",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
} as const;

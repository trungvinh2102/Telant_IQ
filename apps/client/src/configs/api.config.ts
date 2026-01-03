import { ENV } from "./env";

/**
 * API Configuration
 * Centralized API settings and endpoints
 */

export const API_CONFIG = {
  // Base configuration
  BASE_URL: ENV.API_URL,
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second

  // Request configuration
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
      REFRESH: "/auth/refresh",
      ME: "/auth/me",
    },

    // Users
    USERS: {
      LIST: "/users",
      DETAIL: (id: string | number) => `/users/${id}`,
      CREATE: "/users",
      UPDATE: (id: string | number) => `/users/${id}`,
      DELETE: (id: string | number) => `/users/${id}`,
    },

    // Problems
    PROBLEMS: {
      LIST: "/problems",
      DETAIL: (id: string | number) => `/problems/${id}`,
      CREATE: "/problems",
      UPDATE: (id: string | number) => `/problems/${id}`,
      DELETE: (id: string | number) => `/problems/${id}`,
    },

    // Submissions
    SUBMISSIONS: {
      LIST: "/submissions",
      DETAIL: (id: string | number) => `/submissions/${id}`,
      CREATE: "/submissions",
      BY_USER: (userId: string | number) => `/submissions/user/${userId}`,
    },

    // Dashboard
    DASHBOARD: {
      STATS: "/dashboard/stats",
      RECENT_ACTIVITY: "/dashboard/recent-activity",
    },
  },
} as const;

export type ApiEndpoints = typeof API_CONFIG.ENDPOINTS;

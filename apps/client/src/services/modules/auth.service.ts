/**
 * Auth Service
 * API endpoints for authentication
 */

import { API_CONFIG } from "@/configs";
import { LoginCredentials, AuthResponse, RegisterCredentials } from "@/types";

import { apiClient } from "../api";

export class AuthService {
  /**
   * Login with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials,
      {
        requireAuth: false,
      }
    );
  }

  /**
   * Register with credentials
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      credentials,
      {
        requireAuth: false,
      }
    );
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    return apiClient.post<void>(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REFRESH);
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<AuthResponse["user"]> {
    const response = await apiClient.get<{ user: AuthResponse["user"] }>(
      API_CONFIG.ENDPOINTS.AUTH.ME
    );
    return response.user;
  }
}

// Export singleton instance
export const authService = new AuthService();

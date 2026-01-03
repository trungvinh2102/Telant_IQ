/**
 * User Service
 * API endpoints for user management
 */

import { API_CONFIG } from "@/configs";
import type { User } from "@/types";

import { apiClient } from "../api";

export class UserService {
  /**
   * Fetch all users
   */
  async fetchUsers(): Promise<User[]> {
    return apiClient.get<User[]>(API_CONFIG.ENDPOINTS.USERS.LIST);
  }

  /**
   * Fetch single user by ID
   */
  async fetchUser(id: number): Promise<User> {
    return apiClient.get<User>(API_CONFIG.ENDPOINTS.USERS.DETAIL(id));
  }

  /**
   * Create new user
   */
  async createUser(user: Omit<User, "id">): Promise<User> {
    return apiClient.post<User>(API_CONFIG.ENDPOINTS.USERS.CREATE, user);
  }

  /**
   * Update existing user
   */
  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return apiClient.put<User>(API_CONFIG.ENDPOINTS.USERS.UPDATE(id), user);
  }

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<void> {
    return apiClient.delete<void>(API_CONFIG.ENDPOINTS.USERS.DELETE(id));
  }
}

// Export singleton instance
export const userService = new UserService();

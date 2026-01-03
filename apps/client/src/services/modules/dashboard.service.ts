/**
 * Dashboard Service
 * API endpoints for dashboard statistics and activity
 */

import { API_CONFIG } from "@/configs";
import type { DashboardStats, RecentActivity } from "@/types";

import { apiClient } from "../api";

export class DashboardService {
  /**
   * Fetch dashboard statistics
   */
  async fetchStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(API_CONFIG.ENDPOINTS.DASHBOARD.STATS);
  }

  /**
   * Fetch recent activity
   */
  async fetchRecentActivity(): Promise<RecentActivity[]> {
    return apiClient.get<RecentActivity[]>(
      API_CONFIG.ENDPOINTS.DASHBOARD.RECENT_ACTIVITY
    );
  }
}

// Export singleton instance
export const dashboardService = new DashboardService();

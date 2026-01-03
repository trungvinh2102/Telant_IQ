/**
 * Dashboard Types
 */

export interface DashboardStats {
  total_problems: number;
  total_submissions: number;
  accepted_submissions: number;
  total_users?: number;
}

export interface RecentActivity {
  id: number;
  type: "submission" | "problem_created" | "user_joined";
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

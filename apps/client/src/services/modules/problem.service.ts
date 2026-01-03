/**
 * Problem Service
 * API endpoints for problem management
 */

import { API_CONFIG } from "@/configs";
import type { Problem } from "@/types";

import { apiClient } from "../api";

export class ProblemService {
  /**
   * Fetch all problems
   */
  async fetchProblems(): Promise<Problem[]> {
    return apiClient.get<Problem[]>(API_CONFIG.ENDPOINTS.PROBLEMS.LIST);
  }

  /**
   * Fetch single problem by ID
   */
  async fetchProblem(id: string | number): Promise<Problem> {
    return apiClient.get<Problem>(API_CONFIG.ENDPOINTS.PROBLEMS.DETAIL(id));
  }

  /**
   * Create new problem
   */
  async createProblem(problem: Omit<Problem, "id">): Promise<Problem> {
    return apiClient.post<Problem>(
      API_CONFIG.ENDPOINTS.PROBLEMS.CREATE,
      problem
    );
  }

  /**
   * Update existing problem
   */
  async updateProblem(
    id: string | number,
    problem: Partial<Problem>
  ): Promise<Problem> {
    return apiClient.put<Problem>(
      API_CONFIG.ENDPOINTS.PROBLEMS.UPDATE(id),
      problem
    );
  }

  /**
   * Delete problem
   */
  async deleteProblem(id: string | number): Promise<void> {
    return apiClient.delete<void>(API_CONFIG.ENDPOINTS.PROBLEMS.DELETE(id));
  }
}

// Export singleton instance
export const problemService = new ProblemService();

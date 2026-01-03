import { API_CONFIG } from "@/configs";
import type { Submission, SubmissionRequest } from "@/types";

import { apiClient } from "../api";

export class SubmissionService {
  /**
   * Fetch all submissions
   */
  async fetchSubmissions(): Promise<Submission[]> {
    return apiClient.get<Submission[]>(API_CONFIG.ENDPOINTS.SUBMISSIONS.LIST);
  }

  /**
   * Fetch single submission by ID
   */
  async fetchSubmission(id: string | number): Promise<Submission> {
    return apiClient.get<Submission>(
      API_CONFIG.ENDPOINTS.SUBMISSIONS.DETAIL(id)
    );
  }

  /**
   * Create new submission (run code)
   */
  async createSubmission(submission: SubmissionRequest): Promise<Submission> {
    return apiClient.post<Submission>(
      API_CONFIG.ENDPOINTS.SUBMISSIONS.CREATE,
      submission
    );
  }

  /**
   * Fetch submissions by user ID
   */
  async fetchSubmissionsByUser(userId: string | number): Promise<Submission[]> {
    return apiClient.get<Submission[]>(
      API_CONFIG.ENDPOINTS.SUBMISSIONS.BY_USER(userId)
    );
  }
}

// Export singleton instance
export const submissionService = new SubmissionService();

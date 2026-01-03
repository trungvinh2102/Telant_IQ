/**
 * API Related Types
 */

export interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
  timeoutMs?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

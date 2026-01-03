/**
 * API Client
 * Core HTTP client with timeout, error handling, and authentication
 */

import { API_CONFIG } from "@/configs";

import { ApiError } from "./errors";
import { apiInterceptors } from "./interceptors";
import type { RequestOptions } from "@/types";

export class ApiClient {
  private baseUrl: string;
  private defaultTimeoutMs: number;

  constructor(baseUrl?: string, timeout?: number) {
    this.baseUrl = baseUrl ?? API_CONFIG.BASE_URL;
    this.defaultTimeoutMs = timeout ?? API_CONFIG.TIMEOUT;
  }

  /**
   * Generic fetch wrapper with timeout, auth header and structured errors
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs, headers, signal, ...rest } = options;
    const controller = signal ? null : new AbortController();
    const finalSignal = signal ?? controller?.signal;
    const timeoutId = controller
      ? setTimeout(() => controller.abort(), timeoutMs ?? this.defaultTimeoutMs)
      : undefined;

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: apiInterceptors.buildHeaders(headers),
        signal: finalSignal ?? undefined,
        credentials: "include", // Required for HttpOnly cookies
        ...rest,
      });

      const rawBody = await response.text();
      const parsedBody = apiInterceptors.parseResponseBody(rawBody);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          response.statusText || "API request failed",
          parsedBody
        );
      }

      return parsedBody as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if ((error as Error).name === "AbortError") {
        throw new ApiError(408, "Request timed out or was aborted");
      }

      return apiInterceptors.handleError(error, endpoint);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  /**
   * Convenience methods
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

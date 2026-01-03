/**
 * API Interceptors
 * Request and response interceptors for the API client
 */

export class ApiInterceptors {
  /**
   * Build request headers
   */
  buildHeaders(headers: HeadersInit | undefined): Record<string, string> {
    const normalizedHeaders: Record<string, string> = {
      ...this.normalizeHeaders(headers),
    };

    if (!normalizedHeaders["Content-Type"]) {
      normalizedHeaders["Content-Type"] = "application/json";
    }

    // Note: Authorization header is not added here because we use HttpOnly cookies.
    // The browser automatically includes cookies when credentials: 'include' is set in the fetch request.

    return normalizedHeaders;
  }

  /**
   * Normalize different header formats to Record<string, string>
   */
  private normalizeHeaders(headers?: HeadersInit): Record<string, string> {
    if (!headers) {
      return {};
    }

    if (headers instanceof Headers) {
      return Object.fromEntries(headers.entries());
    }

    if (Array.isArray(headers)) {
      return headers.reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    }

    return { ...headers } as Record<string, string>;
  }

  /**
   * Parse response body (JSON or text)
   */
  parseResponseBody(rawBody: string): unknown {
    if (!rawBody) {
      return undefined;
    }

    try {
      return JSON.parse(rawBody);
    } catch {
      return rawBody;
    }
  }

  /**
   * Handle response errors
   */
  handleError(error: unknown, endpoint: string): never {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

export const apiInterceptors = new ApiInterceptors();

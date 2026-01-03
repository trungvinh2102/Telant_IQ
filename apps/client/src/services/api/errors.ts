/**
 * API Error Class
 * Custom error class for API-related errors
 */

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (
      typeof (Error as unknown as { captureStackTrace?: unknown }).captureStackTrace === 'function'
    ) {
      (
        Error as unknown as {
          captureStackTrace: (target: object, constructor: NewableFunction) => void;
        }
      ).captureStackTrace(this, ApiError);
    }
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  static isUnauthorized(error: unknown): boolean {
    return ApiError.isApiError(error) && error.status === 401;
  }

  static isForbidden(error: unknown): boolean {
    return ApiError.isApiError(error) && error.status === 403;
  }

  static isNotFound(error: unknown): boolean {
    return ApiError.isApiError(error) && error.status === 404;
  }

  static isServerError(error: unknown): boolean {
    return ApiError.isApiError(error) && error.status >= 500;
  }
}

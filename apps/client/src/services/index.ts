/**
 * Services Index
 * Central export for all services and API client
 *
 * Usage:
 * import { userService, warehouseService, apiClient } from '@/services';
 */

// API Client & Core
export * from './api';

// Service Modules
export * from './modules';

// Legacy compatibility - will be deprecated
export { apiClient as apiService } from './api/client';

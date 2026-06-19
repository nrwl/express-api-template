export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(message: string): ApiResponse<never> {
  return {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  };
}

export function notFoundResponse(resource: string): ApiResponse<never> {
  return errorResponse(`${resource} not found`);
}

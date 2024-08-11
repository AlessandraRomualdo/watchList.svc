export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

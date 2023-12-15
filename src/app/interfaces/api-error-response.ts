import { ApiError } from "./api-error";

export interface ApiErrorResponse {
  success: boolean,
  error: ApiError
}

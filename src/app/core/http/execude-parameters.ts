import { HttpMethod } from './http.types';

export interface ExecuteGetParameters {
  path: string;
  cacheKey?: string;
  customBaseUrl?: string;
}

export interface ExecuteParameters<T> extends ExecuteGetParameters {
  body?: T | null;
  method: HttpMethod;
}

export interface ExecutePatchPostPutParameters<T> extends ExecuteGetParameters {
  body?: T;
}

export interface DefaultResponse<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: T;
}

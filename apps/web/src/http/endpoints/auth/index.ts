import type { AxiosRequestConfig } from "axios";

import apiInstance from "@/config/api";
import type {
  AuthProvider,
  CreateProviderResult,
  DeleteProviderResult,
  GetAllProvidersResult,
  GetCurrentUserResult,
  GetEnabledProvidersResult,
  LoginBody,
  LoginResult,
  LogoutResult,
  NewProvider,
  OIDCConfigResult,
  RequestPasswordResetBody,
  RequestPasswordResetResult,
  ResetPasswordBody,
  ResetPasswordResult,
  UpdateProviderResult,
  UpdateProvidersOrderBody,
  UpdateProvidersOrderResult,
} from "./types";

export const login = <TData = LoginResult>(loginBody: LoginBody, options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.post(`/api/auth/login`, loginBody, options) as Promise<TData>;
};

export const logout = <TData = LogoutResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.post(`/api/auth/logout`, undefined, options) as Promise<TData>;
};

export const requestPasswordReset = <TData = RequestPasswordResetResult>(
  requestPasswordResetBody: RequestPasswordResetBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.post(`/api/auth/forgot-password`, requestPasswordResetBody, options) as Promise<TData>;
};

export const resetPassword = <TData = ResetPasswordResult>(
  resetPasswordBody: ResetPasswordBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.post(`/api/auth/reset-password`, resetPasswordBody, options) as Promise<TData>;
};

export const getCurrentUser = <TData = GetCurrentUserResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.get(`/api/auth/me`, options) as Promise<TData>;
};

export const getOIDCConfig = <TData = OIDCConfigResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.get(`/api/auth/oidc/config`, options) as Promise<TData>;
};

export const initiateOIDCLogin = (state?: string, redirectUri?: string): string => {
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (redirectUri) params.append("redirect_uri", redirectUri);

  const queryString = params.toString();
  return `/api/auth/oidc/authorize${queryString ? `?${queryString}` : ""}`;
};

export const getEnabledProviders = <TData = GetEnabledProvidersResult>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.get(`/api/auth/providers`, options) as Promise<TData>;
};

export const getAllProviders = <TData = GetAllProvidersResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.get(`/api/auth/providers/all`, options) as Promise<TData>;
};

export const createProvider = <TData = CreateProviderResult>(
  newProvider: NewProvider,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.post(`/api/auth/providers`, newProvider, options) as Promise<TData>;
};

export const updateProvider = <TData = UpdateProviderResult>(
  id: string,
  updates: Partial<AuthProvider>,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.put(`/api/auth/providers/manage/${id}`, updates, options) as Promise<TData>;
};

export const deleteProvider = <TData = DeleteProviderResult>(
  id: string,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.delete(`/api/auth/providers/manage/${id}`, options) as Promise<TData>;
};

export const updateProvidersOrder = <TData = UpdateProvidersOrderResult>(
  updateProvidersOrderBody: UpdateProvidersOrderBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.put(`/api/auth/providers/order`, updateProvidersOrderBody, options) as Promise<TData>;
};

export const getAuthConfig = <TData = { passwordAuthEnabled: boolean }>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.get(`/api/auth/config`, options) as Promise<TData>;
};

import type { AxiosRequestConfig } from "axios";

import apiInstance from "@/config/api";
import type {
  ActivateUserResult,
  DeactivateUserResult,
  DeleteUserResult,
  GetUserByIdResult,
  ListUsersResult,
  RegisterUserBody,
  RegisterUserResult,
  RemoveAvatarResult,
  UpdateUserBody,
  UpdateUserImageBody,
  UpdateUserImageResult,
  UpdateUserResult,
  UploadAvatarBody,
  UploadAvatarResult,
} from "./types";

/**
 * Register a new user (admin only)
 * @summary Register New User
 */
export const registerUser = <TData = RegisterUserResult>(
  registerUserBody: RegisterUserBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.post(`/api/users/register`, registerUserBody, options) as Promise<TData>;
};

/**
 * List all users (admin only)
 * @summary List All Users
 */
export const listUsers = <TData = ListUsersResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.get(`/api/users/list`, options) as Promise<TData>;
};

/**
 * Update user data (admin only)
 * @summary Update User Data
 */
export const updateUser = <TData = UpdateUserResult>(
  updateUserBody: UpdateUserBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.put(`/api/users/update`, updateUserBody, options) as Promise<TData>;
};

/**
 * Get a user by ID (admin only)
 * @summary Get User by ID
 */
export const getUserById = <TData = GetUserByIdResult>(id: string, options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.get(`/api/users/details/${id}`, options) as Promise<TData>;
};

/**
 * Delete a user (admin only)
 * @summary Delete User
 */
export const deleteUser = <TData = DeleteUserResult>(id: string, options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.delete(`/api/users/delete/${id}`, options) as Promise<TData>;
};

/**
 * Activate a user (admin only)
 * @summary Activate User
 */
export const activateUser = <TData = ActivateUserResult>(id: string, options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.patch(`/api/users/activate/${id}`, undefined, options) as Promise<TData>;
};

/**
 * Deactivate a user (admin only)
 * @summary Deactivate User
 */
export const deactivateUser = <TData = DeactivateUserResult>(
  id: string,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.patch(`/api/users/deactivate/${id}`, undefined, options) as Promise<TData>;
};

/**
 * Update user profile image (admin only)
 * @summary Update User Image
 */
export const updateUserImage = <TData = UpdateUserImageResult>(
  id: string,
  updateUserImageBody: UpdateUserImageBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.patch(`/api/users/update-image/${id}`, updateUserImageBody, options) as Promise<TData>;
};

/**
 * Upload and update user profile image
 * @summary Upload user avatar
 */
export const uploadAvatar = <TData = UploadAvatarResult>(
  uploadAvatarBody: UploadAvatarBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  const formData = new FormData();

  if (uploadAvatarBody.file !== undefined) {
    formData.append("file", uploadAvatarBody.file as Blob);
  }

  return apiInstance.post(`/api/users/avatar/upload`, formData, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "multipart/form-data",
    },
  }) as Promise<TData>;
};

/**
 * Remove user profile image
 * @summary Remove user avatar
 */
export const removeAvatar = <TData = RemoveAvatarResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.delete(`/api/users/avatar/remove`, options) as Promise<TData>;
};

import type { AxiosRequestConfig } from "axios";

import apiInstance from "@/config/api";
import type {
  CheckFolderBody,
  CheckFolderResult,
  DeleteFolderResult,
  ListFoldersResult,
  MoveFolderBody,
  MoveFolderResult,
  RegisterFolderBody,
  RegisterFolderResult,
  UpdateFolderBody,
  UpdateFolderResult,
} from "./types";

/**
 * Checks if the folder meets constraints and validation rules
 * @summary Check folder for constraints
 */
export const checkFolder = <TData = CheckFolderResult>(
  checkFolderBody: CheckFolderBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.post(`/api/folders/check`, checkFolderBody, options) as Promise<TData>;
};

/**
 * Registers folder metadata in the database
 * @summary Register Folder Metadata
 */
export const registerFolder = <TData = RegisterFolderResult>(
  registerFolderBody: RegisterFolderBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.post(`/api/folders`, registerFolderBody, options) as Promise<TData>;
};

/**
 * Lists user folders with optional recursive structure
 * @summary List Folders
 */
export const listFolders = <TData = ListFoldersResult>(options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.get(`/api/folders`, options) as Promise<TData>;
};

/**
 * Updates folder metadata
 * @summary Update Folder
 */
export const updateFolder = <TData = UpdateFolderResult>(
  id: string,
  updateFolderBody: UpdateFolderBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.patch(`/api/folders/${id}`, updateFolderBody, options) as Promise<TData>;
};

/**
 * Moves folder to different parent
 * @summary Move Folder
 */
export const moveFolder = <TData = MoveFolderResult>(
  id: string,
  moveFolderBody: MoveFolderBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return apiInstance.put(`/api/folders/${id}/move`, moveFolderBody, options) as Promise<TData>;
};

/**
 * Deletes a folder
 * @summary Delete Folder
 */
export const deleteFolder = <TData = DeleteFolderResult>(id: string, options?: AxiosRequestConfig): Promise<TData> => {
  return apiInstance.delete(`/api/folders/${id}`, options) as Promise<TData>;
};

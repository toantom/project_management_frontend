const USER_INFO = "USER_INFO";
import {
  USER_ROLE_ADMIN,
  USER_ROLE_MANAGER,
  USER_TYPE_ADMIN,
} from "@/common/constants";

interface User {
  created_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  role: number;
  status: number;
  type: number;
  updated_at: string;
}

export const getUser = (): User => {
  return JSON.parse(window.localStorage.getItem(USER_INFO) || "{}");
};

export const saveUser = (user: string): void => {
  window.localStorage.setItem(USER_INFO, JSON.stringify(user));
};

export const isAdminType = (): boolean => {
  return getUser().type === USER_TYPE_ADMIN;
};

export const isManagerRole = (): boolean => {
  return getUser().role === USER_ROLE_MANAGER;
};
export const isAdminRole = (): boolean => {
  return getUser().role === USER_ROLE_ADMIN;
};

export default { getUser, saveUser, isAdminType, isManagerRole, isAdminRole };

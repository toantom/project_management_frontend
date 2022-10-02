const USER_INFO = "USER_INFO";
import { USER_TYPE_ADMIN } from "@/common/constants";

interface User {
  email: string;
  first_name: string;
  header_picture: string;
  last_name: string;
  profile_picture: string;
  type: number | string;
  user_id: number | string;
}

export const getUser = (): User => {
  return JSON.parse(window.localStorage.getItem(USER_INFO) || "{}");
};

export const saveUser = (user: string): void => {
  window.localStorage.setItem(USER_INFO, JSON.stringify(user));
};

export const isAdmin = (): boolean => {
  return getUser().type === USER_TYPE_ADMIN;
};

export default { getUser, saveUser, isAdmin };

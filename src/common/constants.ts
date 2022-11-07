export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const USER_TYPE_EMPLOYEE = 1;
export const USER_TYPE_ADMIN = 2;

export const USER_ROLE_EMPLOYEE = 1;
export const USER_ROLE_MANAGER = 2;
export const USER_ROLE_ADMIN = 99;

export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_INACTIVE = 0;
export const PAGE_TITLES = {
  DEFAULT: "Project Management",
};

export const PROJECT_STATUS = {
  1: "On Track",
  2: "Maintenance",
};

export const PRIORITY = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

export const TASK_TYPE = [
  { value: 1, label: "User Story" },
  { value: 2, label: "Task" },
  { value: 3, label: "Bug" },
];

export const PROJECT_TYPE = [
  { value: 1, label: "Project Base" },
  { value: 2, label: "Labo" },
];
export const PROJECT_PUBLIC = [
  { value: 1, label: "Public" },
  { value: 0, label: "Private" },
];

export const DEFAULT_PAGE = 1;

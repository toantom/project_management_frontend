export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export const API_URL_FILE = process.env.VUE_APP_URL_FILE;

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
  { value: 4, label: "Bug UAT" },
];

export const PROJECT_TYPE = [
  { value: 1, label: "Project Base" },
  { value: 2, label: "Labo" },
];
export const PROJECT_PUBLIC = [
  { value: 1, label: "Public" },
  { value: 0, label: "Private" },
];

export const TASK_STATUS = [
  { value: 1, label: "New" },
  { value: 2, label: "In progress" },
  { value: 3, label: "Done" },
  { value: 4, label: "Close" },
];
export enum HttpStatusCode {
  ok = 200,
  created = 201,
  bad_request = 400,
  expired_token = 401,
  forbidden = 403,
  not_found = 404,
  method_not_allowed = 405,
  not_accept = 406,
  error_server = 500,
}

export const DEFAULT_PAGE = 1;

export const API_LOGIN = "/auth/login";
export const API_LOGOUT = "/auth/logout";
export const API_REGISTER = "/auth/register";
export const API_ACCOUNT_ME = "/user";
export const API_GET_INFO_ACCOUNT = "/account/<user_id>";
export const API_UPDATE_INFO_ACCOUNT = "/account/<user_id>";
//projects
export const API_PROJECTS = "/projects";
export const API_PROJECT_DETAIL = "/projects/<project_id>";
export const API_GET_EMPLOYEE_PROJECT = "/projects/get_employee";
export const API_GET_MANAGER_PROJECT = "/projects/get_manager";
export const API_GET_PROJECT_EMPLOYEE = "/projects/<project_id>/get_employee";
//admin
export const API_ADMIN_GET_LIST_EMPLOYEES = "/admin/get_list_employees";
export const API_ADMIN_UPDATE_EMPLOYEE_INFO =
  "/admin/update_employee/<user_id>";
//backlogs
export const API_BACKLOGS = "/backlogs";
export const API_BACKLOG_DETAIL = "/backlogs/<backlog_id>";
///tasks
export const API_TASKS = "/tasks";
export const API_TASKS_DETAIL = "/tasks/<task_id>";

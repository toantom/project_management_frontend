// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
import {
  API_ADMIN_GET_LIST_EMPLOYEES,
  API_ADMIN_UPDATE_EMPLOYEE_INFO,
} from "@/common/api.constants";

export default {
  getAdminListEmployees(page = 1, limit = 10): Promise<object | void> {
    return ApiService.get(API_ADMIN_GET_LIST_EMPLOYEES, {
      params: { page, limit },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  updateEmployeeInfo(data: object, user_id: string): Promise<object | void> {
    return ApiService.put(
      API_ADMIN_UPDATE_EMPLOYEE_INFO.replace("<user_id>", user_id),
      data
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
};

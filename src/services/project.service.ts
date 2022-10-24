// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import {
  API_GET_EMPLOYEE_PROJECT,
  API_PROJECTS,
  API_GET_MANAGER_PROJECT,
} from "@/common/api.constants";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";

export default {
  // eslint-disable-next-line
  getListProjects(page = 1, limit = 10): Promise<any | void> {
    return ApiService.get(API_PROJECTS, {
      params: { page, limit },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  getEmployeeList(): Promise<object | void> {
    return ApiService.get(API_GET_EMPLOYEE_PROJECT)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  getManagerList(): Promise<object | void> {
    return ApiService.get(API_GET_MANAGER_PROJECT)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  // eslint-disable-next-line
  createProject(data: object): Promise<any | void> {
    return ApiService.post(API_PROJECTS, data)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
};

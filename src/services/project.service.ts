// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import {
  API_GET_EMPLOYEE_PROJECT,
  API_PROJECTS,
  API_GET_MANAGER_PROJECT,
  API_UPDATE_PROJECT,
} from "@/common/api.constants";
import { store } from "@/store";
import { SET_ERROR, SET_PROJECT } from "@/store/mutations.types";

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
  // eslint-disable-next-line
  getProjectDetail(project_id: string): Promise<any | void> {
    return ApiService.get(
      API_UPDATE_PROJECT.replace("<project_id>", project_id)
    )
      .then((response: AxiosResponse) => {
        store.commit(SET_PROJECT, response.data.project);
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  // eslint-disable-next-line
  editProject(project_id: string, data: object): Promise<any | void> {
    return ApiService.get(
      API_UPDATE_PROJECT.replace("<project_id>", project_id),
      data
    )
      .then((response: AxiosResponse) => {
        store.commit(SET_PROJECT, response.data.project);
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
};

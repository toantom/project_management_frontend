// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import {
  API_GET_EMPLOYEE_PROJECT,
  API_PROJECTS,
  API_GET_MANAGER_PROJECT,
  API_PROJECT_DETAIL,
  API_GET_PROJECT_EMPLOYEE,
  API_PROJECT_INFO,
  API_GET_PROJECT_CHART_STATUS,
  API_GET_PROJECT_CHART_OVERVIEW,
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
  getProjectInfo(project_id: string): Promise<any | void> {
    return ApiService.get(API_PROJECT_INFO.replace("<project_id>", project_id))
      .then((response: AxiosResponse) => {
        store.commit(SET_PROJECT, response.data.project);
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  // eslint-disable-next-line
  getProjectDetail(project_id: string): Promise<any | void> {
    return ApiService.get(
      API_PROJECT_DETAIL.replace("<project_id>", project_id)
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
    return ApiService.put(
      API_PROJECT_DETAIL.replace("<project_id>", project_id),
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
  getProjectEmployee(project_id: string): Promise<any | void> {
    return ApiService.get(
      API_GET_PROJECT_EMPLOYEE.replace("<project_id>", project_id)
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  getProjectPieChart(project_id: string | undefined): Promise<any | void> {
    return ApiService.get(
      API_GET_PROJECT_CHART_STATUS.replace("<project_id>", <string>project_id)
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  getProjectChartOverView(
    project_id: string | undefined,
    data: object
  ): Promise<any | void> {
    return ApiService.get(
      API_GET_PROJECT_CHART_OVERVIEW.replace(
        "<project_id>",
        <string>project_id
      ),
      {
        params: data,
      }
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
};

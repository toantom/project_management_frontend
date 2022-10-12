// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import { API_GET_LIST_PROJECTS } from "@/common/api.constants";

export default {
  getListProjects(page = 1, limit = 15): Promise<any | void> {
    return ApiService.get(API_GET_LIST_PROJECTS, {
      params: { page, limit },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
};

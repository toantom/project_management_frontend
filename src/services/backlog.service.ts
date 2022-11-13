// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
import { API_BACKLOG_DETAIL, API_BACKLOGS } from "@/common/api.constants";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";

export default {
  // eslint-disable-next-line
  getListBacklog(
    page = 1,
    limit = 10,
    project_id: string
    // eslint-disable-next-line
  ): Promise<any | void> {
    return ApiService.get(API_BACKLOGS, {
      params: { page, limit, project_id },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  // eslint-disable-next-line
  createBacklog(data: object): Promise<any | void> {
    return ApiService.post(API_BACKLOGS, data)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  editBacklog(data: object, backlog_id: string): Promise<any | void> {
    return ApiService.put(
      API_BACKLOG_DETAIL.replace("<backlog_id>", backlog_id),
      data
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  viewBacklogDetail(
    backlog_id: string,
    project_id: string
  ): Promise<any | void> {
    return ApiService.get(
      API_BACKLOG_DETAIL.replace("<backlog_id>", backlog_id),
      {
        params: { project_id },
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

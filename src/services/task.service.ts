// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import { API_TASKS } from "@/common/api.constants";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";

export default {
  viewTasks(data: object): Promise<any | void> {
    return ApiService.get(API_TASKS, {
      params: data,
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  // eslint-disable-next-line
  createTask(data: object): Promise<any | void> {
    return ApiService.post(API_TASKS, data)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
};

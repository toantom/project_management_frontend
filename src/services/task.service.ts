// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import { API_TASK_UPDATE_BY_FIELD, API_TASKS } from "@/common/api.constants";
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
  updateByField(data: object, task_id: string): Promise<any | void> {
    return ApiService.put(
      API_TASK_UPDATE_BY_FIELD.replace("<task_id>", task_id),
      data
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
};

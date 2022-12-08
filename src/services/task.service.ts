// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import {
  API_TASK_UPDATE_BY_FIELD,
  API_TASKS,
  API_TASKS_ADD_COMMENT,
  API_TASKS_DETAIL,
  API_TASKS_REMOVE_FILE,
  API_TASKS_UPLOAD_FILE,
  API_TASKS_UPLOAD_FILE_DETAIL,
  API_TASKS_VIEW_ALL_COMMENT,
} from "@/common/api.constants";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";

export default {
  // eslint-disable-next-line
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
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  viewTaskDetail(data: object, task_id: string): Promise<any | void> {
    return ApiService.get(API_TASKS_DETAIL.replace("<task_id>", task_id), {
      params: data,
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  uploadTaskFile(data: any): Promise<any | void> {
    return ApiService.post(API_TASKS_UPLOAD_FILE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  uploadTaskFileDetail(data: any, task_id: string): Promise<any | void> {
    return ApiService.post(
      API_TASKS_UPLOAD_FILE_DETAIL.replace("<task_id>", task_id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
  removeFile(data: any, task_id: string): Promise<any | void> {
    return ApiService.put(
      API_TASKS_REMOVE_FILE.replace("<task_id>", task_id),
      data
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },

  addComment(data: any, task_id: string): Promise<any | void> {
    return ApiService.post(
      API_TASKS_ADD_COMMENT.replace("<task_id>", task_id),
      data
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },

  getListComment(task_id: string): Promise<any | void> {
    return ApiService.get(
      API_TASKS_VIEW_ALL_COMMENT.replace("<task_id>", task_id)
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        store.commit(SET_ERROR, error);
      });
  },
};

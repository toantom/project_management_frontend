/* eslint-disable */
// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import ApiService from "@/common/api.service";
// constants
import {
  API_GET_INFO_ACCOUNT,
  API_UPDATE_INFO_ACCOUNT,
  API_UPDATE_PASSWORD,
} from "@/common/api.constants";
import UserService from "@/common/user.service";

export default {
  getAccountInfo(id: string): Promise<any | void> {
    return ApiService.get(API_GET_INFO_ACCOUNT.replace("<user_id>", id))
      .then((response: AxiosResponse) => {
        UserService.saveUser(response.data);
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  updateAccountInfo(data: any, id: string): Promise<any | void> {
    return ApiService.put(
      API_UPDATE_INFO_ACCOUNT.replace("<user_id>", id),
      data
    )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
  },
  updatePassword(data: object): Promise<any | void> {
    return ApiService.put(API_UPDATE_PASSWORD, data)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return error.response?.data;
      });
  },
};

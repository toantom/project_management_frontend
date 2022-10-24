/* eslint-disable */
import { store } from "@/store";
// types and interface
import { AxiosError, AxiosResponse } from "axios";
// Services
import { NotAuthorizationApiService } from "@/common/notAuthorizationApi.service";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import { API_ACCOUNT_ME, API_LOGIN, API_LOGOUT } from "@/common/api.constants";
import {
  AUTH_LOGOUT,
  SET_AUTH,
  SET_ERROR,
  SET_TOKEN,
} from "@/store/mutations.types";

export default {
  login(
    username: string,
    password: string,
    type: string
  ): Promise<any | AxiosError> {
    return NotAuthorizationApiService.post(API_LOGIN, {
      username,
      password,
      type,
    })
      .then((response: AxiosResponse) => {
        store.commit(SET_TOKEN, response.data);
        return response;
      })
      .catch((error: AxiosError) => {
        JwtService.destroyToken();
        return error;
      });
  },
  logout(): Promise<any | void> {
    return ApiService.post(API_LOGOUT)
      .then((response: AxiosResponse) => {
        store.commit(AUTH_LOGOUT);
        return response.data;
      })
      .catch(() => {
        JwtService.destroyToken();
      });
  },
  getAccountMe(): Promise<any | void> {
    return new Promise((resolve, reject) => {
      ApiService.get(API_ACCOUNT_ME)
        .then((response: AxiosResponse) => {
          store.commit(SET_AUTH, response.data);
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          store.commit(SET_ERROR, error);
          reject(error.response);
        });
    });
  },
};

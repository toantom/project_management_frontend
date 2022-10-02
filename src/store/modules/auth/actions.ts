import { ActionContext, ActionTree } from "vuex";
// types and interfaces
import { AxiosError, AxiosResponse } from "axios";
import { RootState, AuthState } from "@/store/interfaces";
import { LoginPayload, AuthMutationsType } from "@/store/modules/auth/types";
// Services
import { NotAuthorizationApiService } from "@/common/notAuthorizationApi.service";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
// constants
import { API_LOGIN, API_LOGOUT, API_REGISTER } from "@/common/api.constants";
import { SET_TOKEN } from "@/store/mutations.types";

type AugmentedActionContext = {
  commit<K extends keyof AuthMutationsType>(
    key: K,
    payload: Parameters<AuthMutationsType[K]>[1]
  ): ReturnType<AuthMutationsType[K]>;
} & Omit<ActionContext<AuthState, RootState>, "commit">;

interface AuthActionsType {
  [API_LOGIN]({ commit }: AugmentedActionContext, payload: LoginPayload): void;
}

const actions: ActionTree<AuthState, RootState> & AuthActionsType = {
  [API_REGISTER]({ commit }, payload: LoginPayload) {
    return new Promise((resolve, reject) => {
      NotAuthorizationApiService.post(API_REGISTER, payload)
        .then((response: AxiosResponse) => {
          commit(SET_TOKEN, response.data);
          resolve(response);
        })
        .catch((error: AxiosError) => {
          JwtService.destroyToken();
          reject(error.response);
        });
    });
  },
  [API_LOGIN]({ commit }, payload: LoginPayload) {
    return new Promise((resolve, reject) => {
      NotAuthorizationApiService.post(API_LOGIN, payload)
        .then((response: AxiosResponse) => {
          commit(SET_TOKEN, response.data);
          resolve(response);
        })
        .catch((error: AxiosError) => {
          JwtService.destroyToken();
          reject(error.response);
        });
    });
  },
  [API_LOGOUT]() {
    return new Promise((resolve, reject) => {
      ApiService.post(API_LOGOUT)
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((error: AxiosError) => {
          JwtService.destroyToken();
          reject(error);
        });
    });
  },
};

export default actions;

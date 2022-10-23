import { store } from "@/store";
// types and interfaces
import { MutationTree } from "vuex";
// types and interfaces
import { AuthState } from "@/store/interfaces";
import { TokenPayload, AuthMutationsType } from "@/store/modules/auth/types";
// services
import JwtService from "@/common/jwt.service";
import UserService from "@/common/user.service";
// constants
import {
  SET_TOKEN,
  SET_ERROR,
  SET_AUTH,
  AUTH_LOGOUT,
} from "@/store/mutations.types";
// router
import router from "@/router";

const mutations: MutationTree<AuthState> & AuthMutationsType = {
  [SET_TOKEN](state: AuthState, payload: TokenPayload): void {
    state.isAuthenticated = true;
    state.errors = "";
    JwtService.saveToken(payload.token);
  },
  [SET_ERROR](state, error) {
    error = error.response;
    state.errors = error.data;

    // get status from error
    const status = (error && error.status) || 200;

    if (status === 401) store.commit(AUTH_LOGOUT);
  },
  [SET_AUTH](state, data) {
    state.user = data.data;
    UserService.saveUser(data.data);
  },
  [AUTH_LOGOUT](state) {
    state.errors = "";
    state.user = {};
    state.isAuthenticated = false;
    JwtService.destroyToken();
    router.push({ name: "Login" });
  },
};

export default mutations;

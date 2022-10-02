import { Module } from "vuex";
import { AuthState, RootState } from "@/store/interfaces";
import JwtService from "@/common/jwt.service";
import UserService from "@/common/user.service";

import mutations from "@/store/modules/auth/mutations";
import actions from "@/store/modules/auth/actions";

const state: AuthState = {
  errors: "",
  user: UserService.getUser(),
  isAuthenticated: !!JwtService.getToken(),
};

const auth: Module<AuthState, RootState> = {
  state,
  mutations,
  actions,
};

export default auth;

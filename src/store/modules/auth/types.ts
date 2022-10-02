import { AuthState } from "@/store/interfaces";
import { SET_TOKEN } from "@/store/mutations.types";

export type TokenPayload = {
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  type: number | string;
};

export type AuthMutationsType<S = AuthState> = {
  [SET_TOKEN](state: S, payload: TokenPayload): void;
};

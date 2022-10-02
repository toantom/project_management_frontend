import { createStore, useStore as baseUseStore, Module } from "vuex";
import { RootState } from "./interfaces";
import modules from "./modules";
import getters from "./getters";

const root: Module<RootState, RootState> = {
  modules,
  getters,
};

export const store = createStore<RootState>(root);

// eslint-disable-next-line
export function useStore() {
  return baseUseStore();
}

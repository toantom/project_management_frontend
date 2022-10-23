import { MutationTree } from "vuex";
import { Loading } from "@/store/interfaces";
import { SET_LOADING, SET_CANCEL_LOADING } from "@/store/mutations.types";

const mutations: MutationTree<Loading> = {
  [SET_LOADING](state, payload): void {
    state.isLoading = payload;
  },
  [SET_CANCEL_LOADING](state, payload): void {
    setTimeout(() => {
      state.isLoading = payload;
    }, 1000);
  },
};
export default mutations;

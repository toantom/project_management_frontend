import { MutationTree } from "vuex";
import { Loading } from "@/store/interfaces";
import { SET_LOADING } from "@/store/mutations.types";

const mutations: MutationTree<Loading> = {
  [SET_LOADING](state, payload): void {
    setTimeout(() => {
      state.isLoading = payload;
    }, 1000);
  },
};
export default mutations;

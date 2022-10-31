import { MutationTree } from "vuex";
import { Project } from "@/store/interfaces";
import { SET_PROJECT } from "@/store/mutations.types";

const mutations: MutationTree<Project> = {
  [SET_PROJECT](state, payload): void {
    state.project = payload;
  },
};
export default mutations;

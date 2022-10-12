import mutations from "@/store/modules/loading/mutations";
import { Loading } from "@/store/interfaces";
import { Module } from "vuex";

const state: Loading = {
  isLoading: false,
};
const loading: Module<Loading, any> = {
  state,
  mutations,
};

export default loading;

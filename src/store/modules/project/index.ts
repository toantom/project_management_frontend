import mutations from "@/store/modules/project/mutations";
import { Module } from "vuex";
import { Project } from "@/store/interfaces";

const state: Project = {
  project: {},
};
// eslint-disable-next-line
const project: Module<Project, any> = {
  state,
  mutations,
};

export default project;

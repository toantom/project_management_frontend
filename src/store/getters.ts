/* eslint-disable */
const getters: { [key: string]: any } = {
  isAuthenticated: (state: any) => state.auth.isAuthenticated,
  user: (state: any) => state.auth.user,
  selectedProject: (state: any) => state.job.selectedProject,
};

export default getters;

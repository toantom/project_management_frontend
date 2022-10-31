/* eslint-disable */
const getters: { [key: string]: any } = {
  isAuthenticated: (state: any) => state.auth.isAuthenticated,
  user: (state: any) => state.auth.user,
  errors: (state: any) => state.auth.errors,
  project: (state: any) => state.project.project,
  isLoading: (state: any) => state.loading.isLoading,
};

export default getters;

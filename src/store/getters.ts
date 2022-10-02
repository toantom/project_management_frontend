/* eslint-disable */
const getters: { [key: string]: any } = {
  isAuthenticated: (state: any) => state.auth.isAuthenticated,
  user: (state: any) => state.auth.user,
  isCheckbox: (state: any) => state.job.isCheckbox,
  isEditJob: (state: any) => state.job.isEditJob,
  isScreenDetail: (state: any) => state.template.isScreenDetail,
  isEditTemplate: (state: any) => state.template.isEditTemplate
};

export default getters;

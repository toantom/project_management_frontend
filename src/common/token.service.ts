const CONFIRM_TOKEN = "CONFIRM_TOKEN";

export const getToken = () => {
  return window.localStorage.getItem(CONFIRM_TOKEN);
};

export const saveToken = (token: string) => {
  window.localStorage.setItem(CONFIRM_TOKEN, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(CONFIRM_TOKEN);
};

export default { getToken, saveToken, destroyToken };

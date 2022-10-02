const JWT_TOKEN = "JWT_TOKEN";

export const getToken = (): string | null => {
  return window.localStorage.getItem(JWT_TOKEN);
};

export const saveToken = (token: string): void => {
  window.localStorage.setItem(JWT_TOKEN, token);
};

export const destroyToken = (): void => {
  window.localStorage.removeItem(JWT_TOKEN);
};

export default { getToken, saveToken, destroyToken };

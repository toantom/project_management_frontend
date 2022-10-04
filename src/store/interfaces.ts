export interface RootState {
  version: string;
}
export interface AuthState {
  errors: object | string;
  user: object;
  isAuthenticated: boolean;
}

export interface Toast {
  title: string;
  message: string;
  type: string;
}

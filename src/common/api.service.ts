// services
import axios, { AxiosRequestConfig } from "axios";
import JwtService from "@/common/jwt.service";
// constants
import { API_BASE_URL, HttpStatusCode } from "@/common/constants";
import { useToast } from "vue-toastification";
import router from "@/router";

const ApiService = () => {
  const defaultOptions = {
    baseURL: API_BASE_URL,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json, multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);
  axios.defaults.withCredentials = true;
  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = JwtService.getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    // detect IE11 or IE10
    if (
      navigator.userAgent.match(/Trident.*rv:11\./) ||
      navigator.userAgent.match(/MSIE/i)
    ) {
      config.headers.common["Cache-Control"] = "no-cache";
    }

    return config;
  });
  instance.interceptors.response.use(
    (response: AxiosRequestConfig) => {
      return response;
    },
    (error: any) => {
      const { status, data } = error.response;
      const toast = useToast();
      if (status === HttpStatusCode.expired_token) {
        const a = document.getElementsByClassName("ant-notification-notice");

        if (a.length === 0) {
          toast.error(data.errors.error_message);
        }
        setTimeout(() => {
          router.push({ name: "Login" });
        }, 1000);
        return;
      }
      if (status === HttpStatusCode.forbidden) {
        toast.error(data.errors.error_message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }
      return error.response;
    }
  );

  return instance;
};

export default ApiService();

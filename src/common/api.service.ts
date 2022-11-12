// services
import axios from "axios";
import JwtService from "@/common/jwt.service";
// constants
import { API_BASE_URL } from "@/common/constants";

const ApiService = () => {
  const defaultOptions = {
    baseURL: API_BASE_URL,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
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

  return instance;
};

export default ApiService();

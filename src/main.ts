import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./assets/scss/main.scss";
import "bootstrap";
import "boxicons/css/boxicons.min.css";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  draggable: false,
  timeout: 5000,
};
createApp(App).use(store).use(router).use(Toast, options).mount("#app");

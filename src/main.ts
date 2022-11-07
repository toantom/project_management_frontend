import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./assets/scss/main.scss";
import "bootstrap";
import "boxicons/css/boxicons.min.css";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import CKEditor from "@ckeditor/ckeditor5-vue";

const options: PluginOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  draggable: false,
  timeout: 2500,
};
createApp(App)
  .use(store)
  .use(router)
  .use(Toast, options)
  .use(CKEditor)
  .component("v-select", vSelect)
  .mount("#app");

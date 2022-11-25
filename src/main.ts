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
import VueApexCharts from "vue3-apexcharts";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const options: PluginOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  draggable: false,
  timeout: 2500,
};
const app = createApp(App);
app
  .use(Antd)
  .use(store)
  .use(router)
  .use(Toast, options)
  .use(CKEditor)
  .use(VueApexCharts)
  .component("v-select", vSelect)
  .mount("#app");

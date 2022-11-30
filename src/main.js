import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { router } from "./router";

import request from "@/lib/axios.js";
import qs from 'qs';

// global components
import pluginComponents from "@/components/pluginComponents.js";

// global style
import "./assets/main.scss";

// v-loading
import { vLoading } from "@/lib/global.js";

const app = createApp(App);

app.directive('loading', vLoading)

app.config.globalProperties.$axios = request;
app.config.globalProperties.$qs = qs;

app.use(router).use(pluginComponents).mount("#app");

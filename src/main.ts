import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Vuetify from "./mir/plugins/vuetify";
import store from "./mir/store";
import emitter from "./mir/emitter/useEmitter";

import "./assets/main.css";

const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(Antd);
app.use(store);
app.use(Vuetify);
app.mount("#app");

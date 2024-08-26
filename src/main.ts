import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { i18nPlugin } from "./plugins/i18n.plugins";
import "./style.css"
const pinia = createPinia();
createApp(App).use(router).use(pinia).use(i18nPlugin).mount("#app");

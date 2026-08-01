import { createApp } from "vue";
import { setupIcons } from "./util/icon.js";
import { OhVueIcon } from "oh-vue-icons";
import App from "./App.vue";
import router from "./util/router.js";
const app = createApp(App);
import "./style.css";
setupIcons()
app.component("v-icon", OhVueIcon)
app.use(router).mount("#app")

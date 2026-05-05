import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./Router/index";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaChartBar  , FaUsers ,FaAddressBook , FaThList , FaBars ,FaBell , FaSignOutAlt , FaCog ,FaSearch } from "oh-vue-icons/icons/fa";

addIcons(FaChartBar , FaUsers , FaAddressBook , FaThList , FaBars , FaBell , FaSignOutAlt , FaCog  , FaSearch); ;

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(router).mount("#app");

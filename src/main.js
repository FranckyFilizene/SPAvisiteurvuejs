import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./Router/index";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  FaBars,
  FaGlobe,
  FaChartLine,
  FaUserPlus,
  FaThList,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaTrash,
  FaEdit,
  FaUser,
  FaPhoneAlt,
  FaCalendarDay,
  FaDollarSign,
  FaSave,
  FaStickyNote,
} from "oh-vue-icons/icons/fa";

addIcons(
  FaChartLine,
  FaGlobe,
  FaBars,
  FaUserPlus,
  FaThList,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaTrash,
  FaEdit,
  FaUser,
  FaPhoneAlt,
  FaCalendarDay,
  FaDollarSign,
  FaSave,
  FaStickyNote,
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(router).mount("#app");

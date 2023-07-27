import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiBriefcaseFill,
  BiPersonCircle,
  GiBuyCard,
  FaUsers,
  PrEye,
  PrEyeSlash,
} from "oh-vue-icons/icons";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

addIcons(
  BiPersonCircle,
  GiBuyCard,
  BiBriefcaseFill,
  FaUsers,
  PrEye,
  PrEyeSlash
);
const pinia = createPinia();
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.use(router).use(pinia).mount("#app");

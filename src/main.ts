import { IonicVue } from "@ionic/vue";
import { IonicConfig } from "@ionic/core";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import App from "./App.vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import "./style.scss";
const ionicConfig: IonicConfig = {
  mode: "ios",
  innerHTMLTemplatesEnabled: true,
  animated: true,
};

const app = createApp(App);

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(IonicVue, ionicConfig);
app.use(router);
router.isReady().then(() => {
  app.mount("#app");
});

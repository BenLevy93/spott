import Vue from "vue";
import App from "./App.vue";
// import VueMaterial from "vue-material";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
// Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");

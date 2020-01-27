import Vue from "vue";
import App from "./App.vue";

import element from "./element.js";
Vue.use(element);

Vue.config.productionTip = false;

// console.log("process.env.NODE_ENV", process.env.NODE_ENV);

new Vue({
  render: h => h(App)
}).$mount("#app");

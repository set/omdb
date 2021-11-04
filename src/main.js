import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import "./assets/scss/main.scss";

// Debounce library for the input
import vueDebounce from "vue-debounce";
Vue.use(vueDebounce);

// Pagination component as global
import Pagination from "./components/Pagination";
Vue.component("pagination", Pagination);

// Checkbox component as global
import Checkbox from "./components/Checkbox";
Vue.component("checkbox", Checkbox);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import Axios from 'axios'
import Vcomp from './components/index'
import VCharts from "v-charts"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/iconfont/iconfont.css"
import i18n from './lang'
import "./assets/css/global.scss"
import VueI18n from "vue-i18n"


Vue.use(VCharts);
Vue.use(Vcomp);
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.prototype.$axios = Axios;
Vue.config.productionTip = "/api";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

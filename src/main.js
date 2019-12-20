import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import './plugins/element.js'
import vuetify from './plugins/vuetify';
import './plugins/socketPlugin';
import Directives from './plugins/directives';
import store from './store/index';
import { store2 } from './store/store2';

Vue.use(Directives);
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  store2,
  vuetify,
  render: h => h(App)
}).$mount('#app')

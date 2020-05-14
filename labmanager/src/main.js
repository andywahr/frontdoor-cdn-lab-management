import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
//import msal from 'vue-msal'
import AuthService from './services/auth'
import api from './api'

var config = require('./config');
var appConfig = config.loadConfig();

/*Vue.use(msal, {
    auth: {
      clientId: appConfig.clientId,
      redirectUri: appConfig.redirectUri
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false, 
    }, 
    request : {
      scopes: ["user.read"]
    }
});*/


Vue.prototype.$auth = new AuthService(appConfig);
Vue.prototype.$api = new api(appConfig, Vue.prototype.$auth);

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

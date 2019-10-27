import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import 'bulmaswatch/darkly/bulmaswatch.min.css'
// import 'bulmaswatch/darkly/_variables.scss'
// import 'bulmaswatch/darkly/_overrides.scss'

Vue.use(Buefy);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

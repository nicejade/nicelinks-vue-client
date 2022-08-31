import Vue from 'vue'
import './global.js'
import './mixins/globalMixin.js'
import App from './App'
import router from './router'
import store from './store/'

const version = require('../package.json').version
const log = console.info
log(
  `%c 倾城之链%c：“倾心缔造，痴心为你”，您当前运行的版本为：%c ${version}`,
  'font-weight: 600;color: #ff6768',
  'color: #17223b',
  'color: #20a0ff'
)

const isProductionFlag = process.env.NODE_ENV === 'production'

/* Configure whether to allow vue-devtools inspection. */
Vue.config.devtools = !isProductionFlag

/* Set this to false to prevent the production tip on Vue startup(2.2.0+). */
Vue.config.productionTip = !isProductionFlag

/* Suppress all Vue logs and warnings. */
Vue.config.silent = isProductionFlag

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

/*
  FixBug: [vuex] already installed. Vue.use(Vuex) should be called only once.
  Details: https://github.com/vuejs/vuex/issues/731
 */
// const GlobalVue = window.Vue
// window.Vue = null
// window.Vue = GlobalVue
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import { $util } from 'helper'

Vue.use(Vuex)

const state = {
  userInfo: $util.getSessionStorage('userInfo'),
  nicelinksList: []
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

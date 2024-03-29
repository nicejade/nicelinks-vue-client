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
import Cookies from 'js-cookie'

import { PAGE_SIZE } from 'config/constant'

Vue.use(Vuex)

const state = {
  userInfo: JSON.parse(Cookies.get('userInfo') || '{}'),
  nicelinksList: [],
  // 默认展示「最新分享」而不是「热门分享」；
  requestParamList: {
    alive: 1,
    pageCount: 1,
    pageSize: PAGE_SIZE,
    sortType: -1,
    sortTarget: 'created',
  },
  isLoadMore: true,
  lastPathUrl: '',
  wechatApiSignature: {
    appid: '',
    nonceStr: '',
    signature: '',
    timestamp: '',
  },
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
// import VueTouch from 'vue-touch'
import Cookies from 'js-cookie'
import VueBus from 'vue-bus'
import SocialSharing from 'vue-social-sharing'

import { $apis, $util, $document, $auth, $lodash, $errorReport } from 'helper'
import locales from './locales'
import Filters from './filters'

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(SocialSharing)
Vue.use(VueBus)
// Vue.use(VueTouch, {name: 'v-touch'})

// Initialize the sentry error reporting @2017-10-29
$errorReport.init()

Vue.prototype.$apis = $apis
Vue.prototype.$util = $util
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document
Vue.prototype.$_ = $lodash

/* inject i18n */
const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'zh')
Vue.config.lang = lang
Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

import Icon from 'components/Icon/Icon.vue'
Vue.component('icon', Icon)

import AsideList from 'components/AsideList'
Vue.component('aside-list', AsideList)

import LinksList from 'components/LinksList'
Vue.component('links-list', LinksList)

import OperateTabs from 'components/OperateTabs'
Vue.component('operate-tabs', OperateTabs)

import SubHead from 'components/SubHead'
Vue.component('sub-head', SubHead)

import LoadMore from 'components/LoadMore'
Vue.component('load-more', LoadMore)

/* Public Filter */
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

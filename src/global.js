import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import VueTouch from 'vue-touch'
import Cookies from 'js-cookie'
import { NICE_LINKS_NAME } from './config/constant'
import {
  Pagination,
  Dialog,
  Autocomplete,
  Input,
  Switch,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Alert,
  Card,
  Carousel,
  CarouselItem,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Alert)
Vue.use(Card)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading.directive)
Vue.use(VueI18n)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
// Vue.use(VueTouch, {name: 'v-touch'})

// Initialize the sentry error reporting @2017-10-29
$errorReport.init()

import { $apis, $util, $lodash, $errorReport } from 'helper'
Vue.prototype.$apis = $apis
Vue.prototype.$util = $util
Vue.prototype.$_ = $lodash
Vue.prototype.$setPageTitle = (title = '') => {
  document.title = `${title} - ${NICE_LINKS_NAME}`
}

import locales from './locales'
import filters from './filters'

/* inject i18n */
// const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
// const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'zh')
const lang = Cookies.get('lang') || 'zh'
Vue.config.lang = lang === 'en' ? 'en' : 'zh'
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})

import Icon from 'components/Icon/Icon.vue'
Vue.component('icon', Icon)

import Sidebar from 'components/sidebar/Main.vue'
Vue.component('aside-list', Sidebar)

import LinksList from 'components/linksList/Index.vue'
Vue.component('links-list', LinksList)

import OperateTabs from 'components/OperateTabs'
Vue.component('operate-tabs', OperateTabs)

import SubHead from 'components/SubHead'
Vue.component('sub-head', SubHead)

import LoadMore from 'components/LoadMore'
Vue.component('load-more', LoadMore)

import Search from 'components/Search'
Vue.component('search', Search)

/* Public Filter */
for (let key in filters) {
  Vue.filter(key, filters[key])
}

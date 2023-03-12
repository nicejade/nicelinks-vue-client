import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import {
  Pagination,
  Dialog,
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

import { $apis, $util } from 'helper'
import { NICE_LINKS_NAME } from './config/constant'
import $errorReport from './helper/errorReport'
// Initialize the sentry error reporting @2017-10-29
$errorReport.init()

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.prototype.$apis = $apis
Vue.prototype.$util = $util
Vue.prototype.$cloneDeep = cloneDeep

Vue.prototype.$isMobile = window.innerWidth <= 960
Vue.prototype.$setPageTitle = (title = '') => {
  document.title = `${title} - ${NICE_LINKS_NAME}`
}
Vue.prototype.$gtagReport = (scene = '') => {
  if (window.IS_FROM_GOOGLE_ADS) {
    window.gtag_report_conversion()
    window.IS_FROM_GOOGLE_ADS = false

    const gtag = window.gtag || (() => {})
    gtag('event', scene, {
      event_category: 'conversion',
      event_label: scene,
    })
  }
}

import localesConf from './locales/zh'
import filters from './filters'

Vue.config.lang = 'zh'
Vue.prototype.$t = (key) => {
  return localesConf[key]
}

import Icon from 'components/Icon/Icon.vue'
Vue.component('icon', Icon)

import AsideList from 'components/sidebar/Main.vue'
Vue.component('aside-list', AsideList)

import LinksList from 'components/linksList/Index.vue'
Vue.component('links-list', LinksList)

import OperateTabs from 'components/OperateTabs'
Vue.component('operate-tabs', OperateTabs)

import LoadMore from 'components/LoadMore'
Vue.component('load-more', LoadMore)

import Search from 'components/Search'
Vue.component('search', Search)

/* Public Filter */
for (let key in filters) {
  Vue.filter(key, filters[key])
}

import Vue from 'vue'
import values from 'lodash/values'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import RoutesMapConfig from './routers'
import commonRoutesMap from './commonRoutes'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: RoutesMapConfig.concat(commonRoutesMap)
})

values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

export default routerInstance

import Vue from 'vue'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import routesMapConfig from './routers'
import commonRoutesMap from './commonRoutes'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMapConfig.concat(commonRoutesMap)
})

Object.values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

export default routerInstance

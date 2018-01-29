/*
* 路由跳转权限控制
*/
import Vue from 'vue'
import { $auth } from 'helper'

export default {
  checkVisitAuth (to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }

    if (to.meta.isNeedAuth) {
      $auth.checkAuth().then(result => {
        return result ? next() : next({path: '/404'})
      })
    } else if (to.meta.isNeedLogin) {
      $auth.checkSession() ? next() : next({path: '/login'})
    } else {
      next()
    }
  }
}

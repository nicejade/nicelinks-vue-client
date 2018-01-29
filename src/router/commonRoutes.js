import NotFound from 'partials/NotFound'
import routesMap from './routers'
import { $util } from 'helper'

let commonConf = [{
  path: '/login',
  alias: '/register',
  meta: {
    title: $util.setTitleLang('登录', 'Login'),
    ignoreAuth: true
  },
  component: resolve => require(['partials/Login'], resolve)
}, {
  path: '/index',
  redirect: '/'
}, {
  path: '*',
  meta: {
    title: $util.setTitleLang('404', '404')
  },
  component: NotFound
}]

export default routesMap.concat(commonConf)

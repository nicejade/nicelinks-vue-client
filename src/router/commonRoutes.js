import NotFound from 'partials/NotFound'
import routesMap from './routers'

let commonConf = [{
  path: '/login',
  alias: '/register',
  meta: {
    ignoreAuth: true
  },
  component: resolve => require(['partials/Login'], resolve)
}, {
  path: '/404',
  meta: {
  },
  component: NotFound
}, {
  path: '*',
  redirect: '/'
}]

export default routesMap.concat(commonConf)

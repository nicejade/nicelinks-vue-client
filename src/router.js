import NotFound from 'partials/NotFound'
import { $Routers } from './routers/index.js'
import { $util } from 'helper'

let commonConf = [{
  path: '*',
  meta: {
    title: $util.titleLang('404', '404 Not Found')
  },
  component: NotFound
}, {
  path: '/',
  redirect: 'welcome'
}]

export default $Routers.concat(commonConf)

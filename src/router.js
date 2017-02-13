import NotFound from './views/NotFound'
import { $Routers } from './routers/index.js'
import { $util } from 'helper'

let commonConf = [{
  path: '*',
  meta: {
    title: $util.titleLang('404', '404 Not Found')
  },
  component: NotFound
}]

export default $Routers.concat(commonConf)

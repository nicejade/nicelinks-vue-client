import { $util } from 'helper'

export default {
  path: '/about',
  meta: {
    title: $util.setTitleLang('', '')
  },
  component: resolve => require(['views/AboutMe'], resolve)
}

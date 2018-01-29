import Frame from 'partials/Frame'
import { $util } from 'helper'

export default {
  path: '/manage',
  component: Frame,
  meta: {
    isNeedAuth: true,
    title: $util.setTitleLang('倾城管理', 'Management')
  },
  children: [{
    path: '/',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城管理', 'Management')
    },
    component: resolve => require(['views/manage/Index'], resolve)
  }, {
    path: 'links',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城站点', 'NICE SITE')
    },
    component: resolve => require(['views/manage/Links'], resolve)
  }, {
    path: 'users',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城用户', 'NICE USER')
    },
    component: resolve => require(['views/manage/Users'], resolve)
  }, {
    path: 'adverts',
    meta: {
      isNeedAuth: true,
      title: $util.setTitleLang('倾城广告', 'NICE ADVERTS')
    },
    component: resolve => require(['views/manage/Adverts'], resolve)
  }]
}

import Frame from 'partials/Frame'

export default {
  path: '/manage',
  component: Frame,
  meta: {
    isNeedAuth: true
  },
  children: [{
    path: '/',
    meta: {
      isNeedAuth: true
    },
    component: resolve => require(['views/manage/Index'], resolve)
  }, {
    path: 'links',
    meta: {
      isNeedAuth: true
    },
    component: resolve => require(['views/manage/Links'], resolve)
  }, {
    path: 'users',
    meta: {
      isNeedAuth: true
    },
    component: resolve => require(['views/manage/Users'], resolve)
  }, {
    path: 'adverts',
    meta: {
      isNeedAuth: true
    },
    component: resolve => require(['views/manage/Adverts'], resolve)
  }]
}

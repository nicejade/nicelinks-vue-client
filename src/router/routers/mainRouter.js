function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

import Frame from 'partials/Frame'

export default {
  path: '/',
  component: Frame,
  children: [{
    path: 'nicelinks',
    needAuth: false,
    alias: '/',
    meta: {
      title: setTitleLang('Nice Links', 'Nice Links')
    },
    component: resolve => require(['views/Nicelinks'], resolve)
  }, {
    path: 'setting',
    needAuth: true,
    meta: {
      title: setTitleLang('设置', 'Setting')
    },
    component: resolve => require(['views/Setting'], resolve)
  }, {
    path: 'forgot-pwd',
    needAuth: true,
    meta: {
      title: setTitleLang('重设密码', 'Reset Password')
    },
    component: resolve => require(['views/ForgotPwd'], resolve)
  }, {
    path: 'account',
    needAuth: false,
    meta: {
      title: setTitleLang('账户激活', 'Activate Account')
    },
    component: resolve => require(['views/Account'], resolve)
  }]
}

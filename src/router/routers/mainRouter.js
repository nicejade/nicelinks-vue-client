import Frame from 'partials/Frame'
import { $util } from 'helper'

export default {
  path: '/',
  component: Frame,
  children: [{
    path: '/',
    meta: {
      title: $util.setTitleLang('NICE LINKS', '倾城之链')
    },
    component: resolve => require(['views/Index'], resolve)
  }, {
    path: 'explore/:classify',
    meta: {
      title: $util.setTitleLang('分类', 'Classify')
    },
    component: resolve => require(['views/Nicelinks'], resolve)
  }, {
    path: 'setting',
    meta: {
      isNeedLogin: true,
      title: $util.setTitleLang('设置', 'Setting')
    },
    component: resolve => require(['views/Setting'], resolve)
  }, {
    path: 'forgot-pwd',
    alias: 'reset-pwd',
    meta: {
      title: $util.setTitleLang('重设密码', 'Reset Password')
    },
    component: resolve => require(['views/ForgotPwd'], resolve)
  }, {
    path: 'account',
    meta: {
      title: $util.setTitleLang('账户激活', 'Activate Account')
    },
    component: resolve => require(['views/Account'], resolve)
  }, {
    path: 'member/:id',
    meta: {
      title: $util.setTitleLang('我的主页', 'My Homepage')
    },
    component: resolve => require(['views/Homepage'], resolve)
  }, {
    path: 'post/:id',
    meta: {
      title: $util.setTitleLang('', '')
    },
    component: resolve => require(['views/Post'], resolve)
  }, {
    path: 'tags/:tags',
    meta: {
      title: $util.setTitleLang('倾城标签', 'Nice Tags')
    },
    component: resolve => require(['views/Tags'], resolve)
  }, {
    path: 'collections/tags',
    meta: {
      title: $util.setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/TagsCollections'], resolve)
  }, {
    path: 'theme/:theme',
    meta: {
      title: $util.setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/Theme'], resolve)
  }, {
    path: 'collections/theme',
    meta: {
      title: $util.setTitleLang('倾城主题', 'Nice Themes')
    },
    component: resolve => require(['views/ThemeCollections'], resolve)
  }, {
    path: 'share-link',
    meta: {
      isNeedLogin: true,
      title: $util.setTitleLang('分享链接', 'Share Nice')
    },
    component: resolve => require(['views/share/ShareLink'], resolve)
  }]
}

function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

import Frame from './../views/Frame'
export default {
  path: '/',
  component: Frame,
  children: [{
    path: '/nicelinks',
    meta: {
      title: setTitleLang('晚晴幽草轩', 'Nice Links')
    },
    component: resolve => require(['./../views/Nicelinks'], resolve)
  }]
}

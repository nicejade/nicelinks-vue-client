function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

export default {
  path: '/about',
  meta: {
    title: setTitleLang('晚晴幽草轩', 'Nice Home Blog')
  },
  component: resolve => require(['views/Homepage'], resolve)
}

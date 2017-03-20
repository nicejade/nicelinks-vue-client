function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

export default {
  path: '/bloglinks',
  meta: {
    title: setTitleLang('晚晴幽草轩', 'Nice Home Blog')
  },
  component: resolve => require(['./../views/Bloglinks'], resolve)
}

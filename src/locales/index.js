import zh from './zh'

var locale = {}
function addLang(key, a, b) {
  locale[key] = Object.assign(a, b)
}
addLang('zh', zh)

export default locale

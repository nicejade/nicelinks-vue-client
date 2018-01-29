import zh from './zh'
import en from './en'
import eleEN from 'element-ui/lib/locale/lang/en'
import eleZH from 'element-ui/lib/locale/lang/zh-CN'

var locale = {}
function addLang (key, a, b) {
  locale[key] = Object.assign(a, b)
}
addLang('zh', zh, eleZH)
addLang('en', en, eleEN)

export default locale

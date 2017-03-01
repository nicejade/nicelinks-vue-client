import Vue from 'vue'

export default {
  resMsg (res) {
    let key = {
      zh: 'Chinese',
      en: 'English'
    }[Vue.config.lang]
    try {
      // 有些接口暂时只提供了Chinese 没提供English
      let obj = JSON.parse(res.Message)
      return obj[key] || obj.Chinese
    } catch (e) {
      return res && res.Message
    }
  },

  titleLang (zhStr, enStr) {
    return {
      zh: zhStr,
      en: enStr
    }
  },

  query (search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        objURL[$1] = $3
      }
    )
    return objURL
  },

  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    return url + '?' + str.join('&')
  }
}

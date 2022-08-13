const $lodash = require('./lodash').default

if (typeof String.prototype.startsWith !== 'function') {
  window.String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix
  }
}

if (typeof String.prototype.firstUpperCase !== 'function') {
  window.String.prototype.firstUpperCase = function () {
    return this.replace(/^\S/, function (s) {
      return s.toUpperCase()
    })
  }
}

/*
  DESC：对Date的扩展，将 Date 转化为指定格式的String。
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
      (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
window.Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export default {
  getManageList() {
    return [
      {
        name: 'manageLinks',
        path: 'links',
      },
      {
        name: 'manageUsers',
        path: 'users',
      },
      {
        name: 'manageAdverts',
        path: 'adverts',
      },
      {
        name: 'manageSentences',
        path: 'sentences',
      },
      {
        name: 'manageFriends',
        path: 'friends',
      },
    ]
  },

  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  },

  // 获取字符串实际长度(包含汉字,汉字统一按照 2 字节算;)
  getByteLength(str = '') {
    if (typeof str !== 'string') return str.length
    return str.replace(/[\\u4E00-\\u9FFF]+/g, 'aa').length
  },

  getRedirectLink(url, isalive, isauto) {
    const more = isalive ? '' : `&alive=0`
    const auto = isauto ? '&isauto=1' : ''
    return `https://nicelinks.site/redirect?url=${url}${more}${auto}`
  },

  assembleExternalLink(url) {
    const separator = $lodash.endsWith(url, '/') ? '' : '/'
    return `${url}${separator}?utm_source=nicelinks.site`
  },

  addWalineComment() {
    setTimeout(() => {
      window.Waline({
        el: '#waline',
        serverURL: 'https://comment.nicelinks.site/',
        copyright: false,
        wordLimit: [10, 360],
        requiredMeta: ['nick', 'mail'],
      })
    }, 100)
  },
}

// @desc：分流 utils 中未被频繁使用的方法，同时以模块化输出；
import sha256 from 'crypto-js/sha256'
import md5 from 'crypto-js/md5'
import { STORAGE_PREFIX } from 'config/constant'

const getStorageName = (name = '') => {
  return `${STORAGE_PREFIX}-${name}`
}

export const encryptPwd = (str) => {
  str = sha256(str).toString()
  str = md5(str).toString()
  return str
}

export const getHostnameByUrl = (url) => {
  return new URL(url).hostname
}

/**
 * @desc:获得 mix max 之间的随机值，包括两者;
 * @param {number} min 小值
 * @param {number} max 大值
 * @return {number} 随机数
 */
export const getRandomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

export const isElementInViewport = (elem) => {
  const rect = elem.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 过滤掉 String 中的 Html 标签;
 */
export const filterHtmlTag = (str = '') => {
  return str.replace(/<(.|\n)*?>/g, '')
}

/* 适当截取 String，使得目标内容可以提前显示(默认位置为第 15 个字符) */
export const sliceToAheadTarget = (string = '', target = '', position = 15) => {
  const index = string.indexOf(target)
  if (index <= position) return string
  const sliceIdx = index - position
  const length = string.length - sliceIdx
  return '...' + string.substr(sliceIdx, length)
}

/**
 * @desc 前置填充指定位数个“字符”;
 * @param {number|string} source 源字符/数组
 * @param {number} length 指定长度
 * @param {string} keyStr 填充字符
 */
export const specifiedPadding = (source, length, keyStr) => {
  return (Array(length).join(keyStr) + source).slice(-length)
}

export const queryUrl2Obj = (search) => {
  let str = search || window.location.search
  let objURL = {}

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3
  })
  return objURL
}

export const loadScript = (url, isAsyncFlag) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          resolve('success: ' + url)
        }
      }
    } else {
      script.onload = () => {
        resolve('success: ' + url)
      }
    }

    script.onerror = () => {
      reject(Error(url + 'load error!'))
    }

    script.src = url
    script.async = isAsyncFlag
    document.body.appendChild(script)
  })
}

export const openAuthorSite = (p) => {
  window.open(`https://nicelinks.site/member/admin/?position=${p}`)
}

export const updateAfterFilterEmptyValue = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) delete obj[key]
  }
  return obj
}

export const interceptString = (string = '', length = 140) => {
  let count = 0
  let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
  let result = ''
  for (let i = 0, len = string.length; i < len; i++) {
    const target = string[i]
    const isChinese = reg.test(target)
    result += target
    const step = isChinese ? 2 : 1
    count += step
    if (count >= length) {
      return result + '...'
    }
  }
  return string
}

export const setCurrentDate = (date) => {
  window.$currentDate = date
}

export const getCurrentDate = () => {
  return window.$currentDate || new Date()
}

export const getCurrentDateHMS = (delimiter = '-') => {
  let currentDate = new Date(window.$currentDate) || new Date()
  let currentH = currentDate.getHours()
  let currentM = currentDate.getMinutes()
  let currentS = currentDate.getSeconds()
  return [currentH, currentM, currentS].join(delimiter)
}

export const isLegalUrl = (str) => {
  let pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-z]{2,9}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/
  return pattern.test(str)
}

export const isLegalUsername = (str) => {
  let pattern = /^[a-zA-Z0-9]{3,16}$/
  return pattern.test(str)
}

// 获取字符串实际长度(包含汉字,汉字统一按照 2 字节算;)
const getByteLength = (str = '') => {
  if (typeof str !== 'string') return str.length
  return str.replace(/[\\u4E00-\\u9FFF]+/g, 'aa').length
}

export const isLegalNick = (str) => {
  let pattern = /(.){2,18}$/
  let byteNum = getByteLength(str)
  return pattern.test(str) && byteNum <= 18 && byteNum >= 2
}

export const isLegalEmail = (str) => {
  let pattern = new RegExp('^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$', 'g')
  return pattern.test(str)
}

export const isLegalPassword = (str) => {
  let pattern = new RegExp('^[a-zA-Z0-9@$!%_*#&]{6,18}$', 'g')
  return pattern.test(str)
}

/* -----------------------------localStorage------------------------------------ Start */
/*
 * set localStorage
 */
export const setLocalStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(getStorageName(name), content)
}

/**
 * get localStorage
 */
export const getLocalStorage = (name) => {
  if (!name) return
  let content = window.localStorage.getItem(getStorageName(name))
  return JSON.parse(content)
}

/**
 * delete localStorage
 */
export const removeLocalStorage = (name) => {
  if (!name) return
  window.localStorage.removeItem(getStorageName(name))
}
/* -----------------------------localStorage------------------------------------ End */

/* ----------------------------sessionStorage----------------------------------- Start */
export const setSessionStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(getStorageName(name), content)
}

/**
 * get sessionStorage
 */
export const getSessionStorage = (name) => {
  if (!name) return
  let content = window.sessionStorage.getItem(getStorageName(name))
  return JSON.parse(content)
}

/**
 * delete sessionStorage
 */
export const removeSessionStorage = (name) => {
  if (!name) return
  window.sessionStorage.removeItem(getStorageName(name))
}
/* ----------------------------sessionStorage----------------------------------- End */

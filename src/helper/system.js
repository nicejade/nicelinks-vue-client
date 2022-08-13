export const isAndroidSystem = () => {
  const ua = window.navigator.userAgent
  return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
}

export const isIosSystem = () => {
  const ua = window.navigator.userAgent
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export const isWechatBrowser = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}

export const copyToClipboard = (content) => {
  if (isIosSystem()) {
    const el = document.createElement('textarea')
    const tempNodeId = 'temp-textarea-for-ios-copy'
    el.value = content
    el.id = tempNodeId
    document.body.appendChild(el)
    window.getSelection().removeAllRanges()
    const node = document.getElementById(tempNodeId)
    const range = document.createRange()
    range.selectNode(node)
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    document.body.removeChild(el)
  } else {
    const el = document.createElement('textarea')
    el.value = content
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

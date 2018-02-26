const loadScript = url => {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.async = true
    script.src = url
    script.charset = 'utf8'

    head.appendChild(script)

    script.onload = resolve
    script.onerror = reject
  })
}

import Vue from 'vue'

export default () => {
  // Apparently is now mandatory to add the ID in the url
  const id = 'UA-98631211-1'
  const scriptURL = `https://www.googletagmanager.com/gtag/js?id=${id}`

  loadScript(scriptURL)
    .then(() => {
      window.dataLayer = window.dataLayer || []
      const gtag = () => window.dataLayer.push(arguments)

      gtag('js', new Date())
      gtag('config', id)
      Vue.prototype.$gtag = gtag
    })
    .catch(error => {
      console.log(error.message)
    })
}

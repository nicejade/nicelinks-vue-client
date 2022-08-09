import axios from 'axios'
import { $util, $errorReport } from 'helper'

function requestHandle(params) {
  return new Promise((resolve, reject) => {
    axios(params)
      .then((res) => {
        if (res && (res.unauthorized || res.statusCode === 401)) {
          window.location.href = '/login'
        }
        if (res.type === 'application/x-msdownload') {
          redirectToIframe(res.request.responseURL)
        } else if (res.data) {
          // update current date according backend@17-07-27
          $util.setCurrentDate(res.headers && res.headers.date)
          if (res.data.success) {
            resolve(res.data.value)
          } else {
            reject(res.data.message)
          }
        } else {
          reject(`Something Error @${params.url}.`)
        }
      })
      .catch((err) => {
        $errorReport.captureException(err)
        reject(err)
      })
  })
}

function redirectToIframe(url) {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

export default {
  post: function (url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params,
    })
  },
  get: function (url, params, op) {
    return requestHandle({
      method: 'get',
      url: $util.queryString(url, params),
    })
  },
}

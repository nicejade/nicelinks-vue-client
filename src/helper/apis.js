import $ajax from './ajax'

function requestUrl (path) {
  return `/api/${path}`
}

export default {
  getNiceLinks (data) {
    return $ajax.get(requestUrl('getNiceLinks'), data)
  },

  addNiceLinks (data) {
    return $ajax.post(requestUrl('addNiceLinks'), data)
  },

  dispatchAction (data) {
    return $ajax.post(requestUrl('dispatchAction'), data)
  },

  login (data) {
    return $ajax.post(requestUrl('login'), data)
  }
}

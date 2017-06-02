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

  signup (data) {
    return $ajax.post(requestUrl('auth/signup'), data)
  },

  login (data) {
    return $ajax.post(requestUrl('auth/login'), data)
  },

  logout () {
    return $ajax.post(requestUrl('auth/logout'))
  },

  logoff (data) {
    return $ajax.post(requestUrl('auth/logoff'), data)
  }
}

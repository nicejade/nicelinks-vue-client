import $ajax from './ajax'

function requestUrl (path) {
  return `/api/${path}`
}

export default {
  getNiceLinks () {
    return $ajax.get(requestUrl('getNiceLinks'))
  },

  addNiceLinks (data) {
    return $ajax.post(requestUrl('addNiceLinks'), data)
  }
}

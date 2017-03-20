import $ajax from './ajax'

function requestUrl (path) {
  return `/api/${path}`
}

export default {
  getNiceBlog () {
    return $ajax.get(requestUrl('getNiceBlog'))
  },

  addNewBlog (data) {
    return $ajax.post(requestUrl('addNewBlog'), data)
  }
}

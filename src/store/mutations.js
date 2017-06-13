import {
  GET_USERINFO,
  RECORD_USERINFO
} from 'store/types'
import {$util} from 'helper'

export default {
  [RECORD_USERINFO] (state, info) {
    state.userId = info._id
    state.isLogin = true
    state.userInfo = info
    $util.setStorage('NiceLinksUserId', info._id)
  },

  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }

    if (!state.isLogin) {
      return
    }

    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  }
}

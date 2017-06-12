import {
  GET_USERINFO,
  RECORD_USERINFO
} from 'store/types'

export default {
  [RECORD_USERINFO] (state, info) {
    state.userId = info._id
    state.isLogin = true
    state.userInfo = info
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

import { $apis } from 'helper'
import Cookies from 'js-cookie'

export default {
  async $getUserInfo ({commit, state}) {
    let userId = Cookies.get('user-id')
    if (!userId) return

    let res = await $apis.getProfile({_id: userId})
    commit('$vuexSetUserInfo', res)
  }
}

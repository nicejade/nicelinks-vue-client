import { $apis } from 'helper'
import Cookies from 'js-cookie'

export default {
  async $getUserInfo({ commit, state }) {
    const userId = Cookies.get('user-id')
    const wechat = Cookies.get('is-wechat')
    if (!userId) return

    const res = await $apis.getProfile({ _id: userId, wechat })
    commit('$vuexSetUserInfo', res)
  },
}

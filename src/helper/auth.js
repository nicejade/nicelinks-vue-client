import Cookies from 'js-cookie'
import { $apis } from 'helper'
import { getSessionStorage } from './../helper/tool'

export default {
  checkSession() {
    return Cookies.get('is-login') || false
  },

  async checkAuth() {
    const userId = Cookies.get('user-id')
    if (!userId) return false

    const wechat = Cookies.get('is-wechat')
    let userInfo = getSessionStorage('userInfo')
    userInfo = userInfo || (await $apis.getProfile({ _id: userId, wechat }))
    const isHaveAuth = userInfo.role === 'Admin' || userInfo.role === 'Owner'
    return Cookies.get('is-login') && isHaveAuth
  },
}

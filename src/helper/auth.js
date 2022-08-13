import Cookies from 'js-cookie'
import { $apis } from 'helper'
import { getSessionStorage } from './../helper/tool'

export default {
  checkSession() {
    return Cookies.get('is-login') || false
  },

  async checkAuth() {
    let userId = Cookies.get('user-id')
    if (!userId) return false

    let userInfo = getSessionStorage('userInfo')
    userInfo = userInfo || (await $apis.getProfile({ _id: userId }))
    let isHaveAuth = userInfo.role === 'Admin' || userInfo.role === 'Owner'
    return Cookies.get('is-login') && isHaveAuth
  },
}

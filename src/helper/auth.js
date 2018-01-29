import Cookies from 'js-cookie'
import { $apis, $util } from 'helper'

export default {
  checkSession () {
    return Cookies.get('ns-is-login') || false
  },

  async checkAuth () {
    let userId = Cookies.get('ns-user-id')
    if (!userId) return false

    let userInfo = $util.getSessionStorage('userInfo')
    userInfo = userInfo || await $apis.getProfile({_id: userId})
    let isHaveAuth = userInfo.role === 'Admin' || userInfo.role === 'Owner'
    return Cookies.get('ns-is-login') && isHaveAuth
  }
}

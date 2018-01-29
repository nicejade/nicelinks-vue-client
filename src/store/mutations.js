import { $util } from 'helper'

export default {
  $vuexSetUserInfo (state, info = {}) {
    state.userInfo = info
    $util.setSessionStorage('userInfo', info)
  },

  $setNiceLinksList (state, params = {}) {
    let latestData = params.data || []
    let earlyData = state.nicelinksList
    state.nicelinksList = params.isLoadMore ? earlyData.concat(latestData) : latestData
  }
}

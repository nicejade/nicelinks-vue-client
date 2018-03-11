import { $util } from 'helper'

export default {
  $vuexSetUserInfo (state, info = {}) {
    state.userInfo = info
    $util.setSessionStorage('userInfo', info)
  },

  $vuexSetNiceLinksList (state, params = {}) {
    let latestData = params.data || []
    let earlyData = state.nicelinksList
    state.nicelinksList = params.isLoadMore ? earlyData.concat(latestData) : latestData
  },

  $vuexSetRequestParamList (state, params = {}) {
    Object.assign(state.requestParamList, params)
  },

  $vuexUpdateRequestParamList (state, params = {}) {
    state.requestParamList = {
      pageCount: 1,
      pageSize: 10,
      sortType: -1,
      sortTarget: 'likes'
    }
  },

  $vuexUpdateLoadMoreState (state, isLoadMore) {
    state.isLoadMore = isLoadMore
  }
}

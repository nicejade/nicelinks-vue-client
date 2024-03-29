import Cookies from 'js-cookie'
import { PAGE_SIZE } from 'config/constant'

export default {
  $vuexSetUserInfo(state, info = {}) {
    state.userInfo = info
    Cookies.set('userInfo', JSON.stringify(info))
  },

  $vuexSetNiceLinksList(state, params = {}) {
    let latestData = params.data || []
    let earlyData = state.nicelinksList
    state.nicelinksList = params.isLoadMore ? earlyData.concat(latestData) : latestData
  },

  $vuexSetRequestParamList(state, params = {}) {
    Object.assign(state.requestParamList, params)
  },

  $vuexRecoverRequestParamList(state, params = {}) {
    state.requestParamList = {
      alive: 1,
      pageCount: 1,
      pageSize: PAGE_SIZE,
      sortType: -1,
      sortTarget: 'created',
    }
  },

  $vuexUpdateLoadMoreState(state, isLoadMore) {
    state.isLoadMore = isLoadMore
  },

  $vuexSaveLastPathUrl(state) {
    const currentHref = document.location.href
    state.lastPathUrl = currentHref
  },

  $setWechatApiSignature(state, result) {
    Object.assign(state.wechatApiSignature, result)
  },
}

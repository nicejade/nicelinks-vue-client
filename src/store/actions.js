import {GET_USERINFO} from 'store/types'
import {getUserInfo} from 'service/index'

export default {
  async getUserInfo ({commit, state}) {
    let res = await getUserInfo({_id: state.userId})
    commit(GET_USERINFO, res.value)
  }
}

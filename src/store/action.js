
export default {
  async getUserInfo ({
    commit,
    state
  }) {
    let res = await getUser()
    commit(GET_USERINFO, res)
  }
}

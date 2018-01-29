import $config from 'config'
import { mapMutations } from 'vuex'

const getValueByName = (source = [], name = '') => {
  let result = source.filter(item => {
    return item.name === name
  })[0]
  return result && result['value']
}

export default {
  data () {
    return {
      isLoading: false,
      isShowLoadMore: true,
      tableControl: {
        pageCount: 1,
        pageSize: 10,
        sortType: -1,
        sortTarget: 'likes'
      }
    }
  },

  computed: {
    niceLinksArr () {
      return this.$store && this.$store.state.nicelinksList || []
    }
  },

  methods: {
    ...mapMutations([
      '$setNiceLinksList',
      '$getNiceLinksList'
    ]),

    drawAjaxParams () {
      let params = this.$_.cloneDeep(this.tableControl)
      params.active = true
      params.userId = this.userInfo && this.userInfo._id || ''

      let classifyVal = getValueByName($config.classify, this.$route.params.classify)
      if (this.$route.params.classify && classifyVal) {
        params.classify = classifyVal
      }

      if (this.$route.params.theme) {
        params.theme = decodeURIComponent(this.$route.params.theme)
        params.theme = params.theme.firstUpperCase()
      }

      if (this.$route.params.tags) {
        params.tags = decodeURIComponent(this.$route.params.tags)
      }
      return params
    },

    $fetchSearch (params = {}, isLoadMore = false) {
      Object.assign(this.tableControl, params)

      params = this.drawAjaxParams()
      let apiName = params.tags ? 'getLinksByTag' : 'getNiceLinks'

      this.isLoading = true
      this.$apis[apiName](params).then(result => {
        if (!result || result.length <= 0) {
          this.$setNiceLinksList({
            data: [],
            isLoadMore
          })
          this.isShowLoadMore = false
          return
        } else {
          this.$setNiceLinksList({
            data: result,
            isLoadMore
          })
        }
      }).catch((error) => {
        this.$message.error(`${error}`)
        this.$setNiceLinksList({
          data: $config.default,
          isLoadMore
        })
      }).finally(() => {
        this.isLoading = false
      })
    },

    $onSwitchTabs (item = {}) {
      this.tableControl.pageCount = 1
      this.tableControl.sortTarget = item.sortTarget
      this.tableControl.sortType = item.sortType
      this.$fetchSearch()
    }
  }
}

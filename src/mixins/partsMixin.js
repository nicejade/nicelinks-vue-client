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
      isLoading: false
    }
  },

  computed: {
    $niceLinksArray () {
      return this.$store && this.$store.state.nicelinksList || []
    },
    $requestParamList () {
      return this.$store && this.$store.state.requestParamList || []
    }
  },

  watch: {
  },

  methods: {
    ...mapMutations([
      '$vuexSetNiceLinksList',
      '$vuexSetRequestParamList',
      '$vuexUpdateLoadMoreState'
    ]),

    getMatchSortTarget (sortVal = '') {
      const sortTargetMapping = {
        hottest: {
          sortTarget: 'likes',
          sortType: -1
        },
        latest: {
          sortTarget: 'created',
          sortType: -1
        },
        earliest: {
          sortTarget: 'created',
          sortType: 1
        }
      }
      return sortTargetMapping[sortVal] || {}
    },

    assembleAjaxParams () {
      let params = this.$_.cloneDeep(this.$requestParamList)
      params.active = true
      params.userId = this.userInfo && this.userInfo._id || ''

      let classifyVal = getValueByName($config.classify, this.$route.params.classify)
      if (this.$route.params.classify && classifyVal) {
        params.classify = classifyVal
      }

      const sortVal = this.$util.getUrlParam('sort')
      if (sortVal) {
        Object.assign(params, this.getMatchSortTarget(sortVal))
      }

      if (this.$route.params.theme) {
        params.theme = decodeURIComponent(this.$route.params.theme)
        params.theme = params.theme.firstUpperCase()
      }

      if (this.$route.params.tags) {
        params.tags = decodeURIComponent(this.$route.params.tags)
      }

      return this.$util.updateAfterFilterEmptyValue(params)
    },

    $fetchSearch (params = {}, isLoadMore = false) {
      // Update the LoadMore Button State(true);
      this.$vuexUpdateLoadMoreState(true)

      !isLoadMore ? params.pageCount = 1 : ''
      this.$vuexSetRequestParamList(params)

      params = this.assembleAjaxParams()
      let apiName = params.tags ? 'getLinksByTag' : 'getNiceLinks'

      this.isLoading = true
      this.$apis[apiName](params).then(result => {
        if (!result || result.length <= 0) {
          this.$vuexSetNiceLinksList({
            data: [],
            isLoadMore
          })
          this.$vuexUpdateLoadMoreState(false)
          return
        } else {
          this.$vuexSetNiceLinksList({
            data: result,
            isLoadMore
          })
        }
      }).catch((error) => {
        this.$message.error(`${error}`)
        this.$vuexSetNiceLinksList({
          data: $config.default,
          isLoadMore
        })
      }).finally(() => {
        this.isLoading = false
      })
    },

    $onSwitchTabs (item = {}) {
      const params = {
        pageCount: 1,
        sortTarget: item.sortTarget,
        sortType: item.sortType
      }
      this.$vuexSetRequestParamList(params)
      this.$fetchSearch()
    }
  }
}

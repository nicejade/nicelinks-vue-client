import { mapMutations } from 'vuex'

import { updateAfterFilterEmptyValue } from './../helper/tool'
import CLASSIFY_CONF from './../config/classify'
import DEFAULT_CONF from './../config/default'

const getValueByName = (source = [], name = '') => {
  let result = source.filter((item) => {
    return item.name === name
  })[0]
  return result && result['value']
}

export default {
  data() {
    return {
      isLoading: false,
    }
  },

  computed: {
    $niceLinksArray() {
      return (this.$store && Object.freeze(this.$store.state.nicelinksList)) || []
    },
    $requestParamList() {
      return (this.$store && this.$store.state.requestParamList) || []
    },
  },

  methods: {
    ...mapMutations([
      '$vuexSetNiceLinksList',
      '$vuexSetRequestParamList',
      '$vuexUpdateLoadMoreState',
    ]),

    getMatchSortTarget(sortVal = '') {
      const sortTargetMapping = {
        hottest: {
          sortTarget: 'likes',
          sortType: -1,
        },
        latest: {
          sortTarget: 'created',
          sortType: -1,
        },
        earliest: {
          sortTarget: 'created',
          sortType: 1,
        },
      }
      return sortTargetMapping[sortVal] || {}
    },

    assembleAjaxParams(isLoadMore) {
      let params = this.$cloneDeep(this.$requestParamList)
      params.active = true
      params.userId = (this.userInfo && this.userInfo._id) || ''

      let classifyVal = getValueByName(CLASSIFY_CONF, this.$route.params.classify)
      if (classifyVal && this.$route.params.classify) {
        params.classify = classifyVal
      } else {
        delete params.classify
      }

      const sortVal = this.$util.getUrlParam('sort') || 'latest'
      Object.assign(params, this.getMatchSortTarget(sortVal))

      const pageVal = parseInt(this.$util.getUrlParam('page')) || 1
      params.pageCount = isLoadMore ? params.pageCount : pageVal

      if (this.$route.params.theme) {
        params.theme = decodeURIComponent(this.$route.params.theme)
        params.theme = params.theme.firstUpperCase()
      }

      if (this.$route.params.tags) {
        params.tags = decodeURIComponent(this.$route.params.tags)
      }

      return updateAfterFilterEmptyValue(params)
    },

    $fetchSearch(params = {}, isLoadMore = false) {
      // Update the LoadMore Button State(true);
      this.$vuexUpdateLoadMoreState(true)
      this.$vuexSetRequestParamList(params)

      params = this.assembleAjaxParams(isLoadMore)
      const apiName = params.tags ? 'getLinksByTag' : 'getNiceLinks'

      this.isLoading = true
      this.$apis[apiName](params)
        .then((result) => {
          if (!result || result.length <= 0) {
            this.$vuexSetNiceLinksList({
              data: [],
              isLoadMore,
            })
            this.$vuexUpdateLoadMoreState(false)
            return
          } else {
            this.$vuexSetNiceLinksList({
              data: result,
              isLoadMore,
            })
          }
        })
        .catch((error) => {
          this.$message.error(`${error}`)
          this.$vuexSetNiceLinksList({
            data: DEFAULT_CONF,
            isLoadMore,
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}

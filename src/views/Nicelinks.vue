<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <search class="mobile-search" v-if="$isMobile" />
            <sub-head :theme-list="themeList" @fetch-search="$fetchSearch"> </sub-head>
            <operate-tabs class="operate-tabs-space" @switch-tabs="$onSwitchTabs"> </operate-tabs>
            <links-list :is-abstract="true" :pdata="$niceLinksArray" :is-loading="isLoading">
            </links-list>
            <pagination :count="linksCount" :page="currentPage" />
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/Pagination'

import CLASSIFY_CONF from './../config/classify'
import THEME_CONF from './../config/theme'
import partsMixin from 'mixins/partsMixin.js'
import toNumber from 'lodash/toNumber'

export default {
  name: 'NiceLinks',

  mixins: [partsMixin],

  data() {
    return {
      themeList: [],
      linksCount: 100,
      currentPage: 1,
    }
  },

  components: {
    Pagination,
  },

  created() {
    this.currentPage = toNumber(this.$util.getUrlParam('page')) || 1

    this.updatePageMeta()
    this.setFetchData()

    const sortVal = this.$util.getUrlParam('sort')
    const sortTypeArray = ['hottest', 'latest', 'earliest']
    if (sortTypeArray.indexOf(sortVal) < 0) {
      this.$fetchSearch({}, true)
    }
    this.renderPagination()
  },

  mounted() {
    this.$nextTick(() => {
      const classify = this.$route.params.classify
      if (classify !== 'all') {
        this.$gtagReport(`from-explore-${classify}`)
      }
    })
  },

  methods: {
    updatePageMeta() {
      const classify = this.$route.params.classify
      const localesKey = classify === 'all' ? 'exploreNice' : classify
      this.$setPageTitle(this.$t(localesKey))
    },

    setFetchData() {
      const currentClassify = this.$route.params.classify
      const currentItem = CLASSIFY_CONF.find((item) => {
        return currentClassify === item.name
      })

      if (currentItem && currentItem['value']) {
        this.$vuexSetRequestParamList({
          alive: 1,
          classify: currentItem ? currentItem['value'] : '',
          // 当切换 classify 时候，要更新 requestParamList(vuex) 中的字段为初始值;
          pageCount: this.currentPage,
          sortType: -1,
          sortTarget: 'created',
          theme: null,
        })
      }
      this.setThemeList()
    },

    setThemeList() {
      let allThemeList = []
      THEME_CONF.map((item) => {
        allThemeList = allThemeList.concat(item)
      })
      let classify = this.$requestParamList.classify
      this.themeList = Object.freeze(classify ? THEME_CONF[classify] : allThemeList)
    },

    renderPagination() {
      this.$apis
        .getAllClassifyCount()
        .then((result) => {
          this.genPaginationData(result)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    genPaginationData(params) {
      const pageCountObj = { all: 0 }
      params.forEach((item) => {
        pageCountObj['all'] += item.count
        const tempArr = CLASSIFY_CONF.find((classify) => classify.value === item._id)
        pageCountObj[tempArr.name] = item.count
      })
      const classify = this.$route.params.classify
      this.linksCount = pageCountObj[classify]
    },
  },
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../assets/scss/variables.scss';

.entry-list {
  position: relative;

  .operate-tabs-space {
    margin-bottom: -15px;
  }
}

@media screen and (max-width: $mobile-screen) {
  .entry-list {
    .operate-tabs-space {
      padding-top: 9rem;
    }
  }
}
</style>

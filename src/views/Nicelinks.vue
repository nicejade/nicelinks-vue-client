<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <search class="mobile-search" v-if="$isMobile" />
            <sub-head :theme-list="themeList" @fetch-search="$fetchSearch" />
            <operate-tabs class="operate-tabs-space" />
            <links-list :is-abstract="true" :pdata="$niceLinksArray" :is-loading="isLoading" />
            <pagination :count="linksCount" :page="currentPage" />
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue' 
import SubHead from 'components/SubHead'
Vue.component('sub-head', SubHead)

import Pagination from 'components/Pagination'

import CLASSIFY_CONF from './../config/classify'
import THEME_CONF from './../config/theme'
import partsMixin from 'mixins/partsMixin.js'

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
    this.currentPage = parseInt(this.$util.getUrlParam('page')) || 1

    this.updatePageMeta()
    this.setThemeList()
    this.$fetchSearch()
  },

  mounted() {
    this.$nextTick(() => {
      this.renderPagination()
    })
  },

  methods: {
    updatePageMeta() {
      const classify = this.$route.params.classify
      const localesKey = classify === 'all' ? 'exploreNice' : classify
      this.$setPageTitle(this.$t(localesKey))
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

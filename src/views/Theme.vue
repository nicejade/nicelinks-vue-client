<template>
  <div id="theme-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <search class="mobile-search" v-if="$isMobile" />
            <sub-head :theme-list="themeList" @fetch-search="$fetchSearch"> </sub-head>
            <operate-tabs class="operate-tabs-space" />
            <links-list :is-abstract="true" :pdata="$niceLinksArray" :is-loading="isLoading">
            </links-list>
            <load-more></load-more>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partsMixin from 'mixins/partsMixin.js'
import THEME_CONF from './../config/theme'

export default {
  name: 'theme',

  mixins: [partsMixin],

  data() {
    return {
      themeList: [],
    }
  },

  created() {
    this.$fetchSearch({})
  },

  mounted() {
    this.updatePageMeta()
    this.setThemeList()
  },

  methods: {
    isCurrentThemeVal(value) {
      const cTheme = this.$route.params.theme
      return cTheme.toUpperCase() === value.toUpperCase()
    },

    updatePageMeta() {
      const theme = this.$route.params.theme
      let isFoundTarget = false
      THEME_CONF.forEach((arr) => {
        if (isFoundTarget) return
        arr.forEach((item) => {
          if (item.value.toLowerCase() === theme) {
            this.$setPageTitle(`${item.key} | 主题`)
            isFoundTarget = true
            return
          }
        })
      })
    },

    setThemeList() {
      this.themeList = THEME_CONF.filter((items) => {
        let isInclude = false
        items.forEach((item) => {
          if (this.isCurrentThemeVal(item.value)) {
            isInclude = true
            return
          }
        })
        return isInclude
      })[0]
    },
  },
}
</script>

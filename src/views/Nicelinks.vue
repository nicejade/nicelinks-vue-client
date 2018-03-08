<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <sub-head
              :theme-list="themeList"
              @fetch-search="$fetchSearch">
            </sub-head>
            <operate-tabs class="operate-tabs-space"
              @switch-tabs="$onSwitchTabs">
            </operate-tabs>
            <links-list
              :is-abstract="true"
              :pdata="$niceLinksArray"
              :is-loading="isLoading">
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
import $config from 'config'
import partsMixin from 'mixins/partsMixin.js'
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'NiceLinks',

  mixins: [partsMixin, metaMixin],

  data () {
    return {
      themeList: []
    }
  },

  components: {
  },

  watch: {
    '$route': function (to, from) {
      // 只是别名变化, Vue 无法监听到 @17-07-18;
    }
  },

  created () {
  },

  mounted () {
    this.updatePageTitle()
    this.setFetchData()
    this.$fetchSearch()
  },

  methods: {
    updatePageTitle () {
      const cClassify = this.$route.params.classify
      const localesKey = cClassify === 'all' ? 'exploreNice' : cClassify
      this.title = this.$t(localesKey)
    },

    setFetchData () {
      let currentClassify = this.$route.params.classify
      let currentItem = $config.classify.find(item => {
        return currentClassify === item.name
      })

      if (currentItem && currentItem['value']) {
        this.$vuexSetRequestParamList({
          classify: currentItem ? currentItem['value'] : '',
          // 当切换 classify 时候，要更新 requestParamList(vuex) 中的字段为初始值;
          pageCount: 1,
          sortType: -1,
          sortTarget: 'likes',
          theme: null
        })
      }
      this.setThemeList()
    },

    setThemeList () {
      let allThemeList = []
      $config.theme.map(item => {
        allThemeList = allThemeList.concat(item)
      })
      let classify = this.$requestParamList.classify
      this.themeList = classify ? $config.theme[classify] : allThemeList
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import "../assets/scss/variables.scss";
.entry-list{
  .operate-tabs-space{
    margin-bottom: -15px;
  }
}

@media screen and (max-width: $mobile-screen) {
  .entry-list{
    .operate-tabs-space{
      padding-top: 5rem;
    }
  }
}
</style>

<template>
  <div id="theme-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <sub-head
              :theme-list="themeList"
              @fetch-search="$fetchSearch">
            </sub-head>
            <operate-tabs class="operate-tabs-space" @switch-tabs="$onSwitchTabs" />
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
import partsMixin from 'mixins/partsMixin.js'
import metaMixin from 'mixins/metaMixin.js'
import $config from 'config'

export default {
  name: 'theme',

  mixins: [partsMixin, metaMixin],

  data () {
    return {
      themeList: []
    }
  },

  watch: {
  },

  components: {
  },

  created () {
    this.$fetchSearch()
  },

  mounted () {
    this.setThemeList()
    this.setMetaInfo()
  },

  methods: {
    isCurrentThemeVal (value) {
      const cTheme = this.$route.params.theme
      return cTheme.toUpperCase() === value.toUpperCase()
    },

    setMetaInfo () {
      const themeList = this.$_.flatten($config.theme)
      themeList.map(item => {
        if (this.isCurrentThemeVal(item.value)) {
          this.title = this.$lang === 'en' ? item.value : item.key
        }
      })
    },

    setThemeList () {
      this.themeList = $config.theme.filter(items => {
        let isInclude = false
        items.forEach(item => {
          if (this.isCurrentThemeVal(item.value)) {
            isInclude = true
            return
          }
        })
        return isInclude
      })[0]
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
      padding-top: 5.6rem;
    }
  }
}
</style>


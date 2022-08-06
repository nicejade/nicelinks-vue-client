<template>
  <div id="tags-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <operate-tabs @switch-tabs="$onSwitchTabs" />
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

export default {
  name: 'Tags',

  mixins: [partsMixin],

  data() {
    return {}
  },

  watch: {},

  components: {},

  created() {
    this.$fetchSearch()
  },

  mounted() {
    this.updatePageMeta()
    this.$nextTick(() => {
      if (window.IS_FROM_GOOGLE_ADS) {
        window.gtag_report_conversion()
      }
    })
  },

  methods: {
    updatePageMeta() {
      const tag = this.$route.params.tags || ''
      this.$setPageTitle(`${tag} | 标签`)
    },
  },
}
</script>

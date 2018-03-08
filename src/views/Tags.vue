<template>
  <div id="tags-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <operate-tabs @switch-tabs="$onSwitchTabs"></operate-tabs>
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

export default {
  name: 'Tags',

  mixins: [partsMixin, metaMixin],

  data () {
    return {
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
    this.title = this.$route.params.tags
  },

  methods: {
  }
}
</script>

<template>
  <div id="theme-page" class="wrapper">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <operate-tabs @switch-tabs="$onSwitchTabs"></operate-tabs>
            <links-list :pdata="niceLinksArr" :is-loading="isLoading"></links-list>
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
  name: 'theme',

  mixins: [partsMixin],

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
  },

  methods: {
  }
}
</script>


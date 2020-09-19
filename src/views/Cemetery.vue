<template>
  <div class="wrapper" id="cemetery">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list
              :is-abstract="true"
              :pdata="pastLinksArray"
              :is-loading="isLoading"
            ></links-list>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'Cemetery',

  mixins: [metaMixin],

  data() {
    return {
      pastLinksArray: [],
    }
  },

  components: {},

  watch: {},

  created() {
    // this.updatePageTitle()
    this.fetchPastLinks({
      alive: 0,
      pageSize: 100,
      pageCount: 1,
      sortType: -1,
      sortTarget: 'created',
    })
  },

  mounted() {},

  methods: {
    // updatePageTitle() {
    //   this.title = `${this.$t('niceLinksStr')} - ${this.$t(productCemetery)}`
    // },

    fetchPastLinks(params) {
      this.isLoading = true
      this.$apis
        .getNiceLinks(params)
        .then((result) => {
          if (!result || result.length <= 0) {
            this.pastLinksArray = []
            return
          } else {
            this.pastLinksArray = result
          }
        })
        .catch((error) => {
          this.$message.error(`${error}`)
          this.pastLinksArray = $config.default
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../assets/scss/variables.scss';
#cemetery {
  .entry-list {
    position: relative;
  }
}
</style>

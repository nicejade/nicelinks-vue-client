<template>
  <div id="tags-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="classify-title">{{ $t('tagsCollection') }}</h3>
            <a
              class="gtag-track radius-btn"
              :data-action="`tags-${item}`"
              data-category="collections-tags"
              :data-label="`tags-${item}`"
              v-for="item in tagsList"
              :key="item"
              :href="`/tags/${item}`"
              >{{ item }}
            </a>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageMixin from 'mixins/pageMixin.js'

export default {
  name: 'TagsCollections',

  mixins: [pageMixin],

  data() {
    return {
      isLoading: false,
      tagsList: [],
    }
  },

  watch: {},

  created() {
    this.$apis
      .getAllTags()
      .then((result) => {
        this.tagsList = this.$_.flattenDepth(result.sort())
      })
      .catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      })
  },

  mounted() {
    document.title = `${this.$t('tagsCollection')} - ${this.$t('niceLinksStr')}`
  },

  methods: {},
}
</script>

<style lang="scss">
@import './../assets/scss/variables.scss';

#tags-coll-page {
  .entry-list {
    padding: 15px;
    .classify-title {
      font-size: $font-large;
      font-weight: 500;
      margin: 15px auto;
    }
  }
}
</style>

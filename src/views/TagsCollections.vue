<template>
  <div id="tags-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="classify-title">{{ $t('tagsCollection') }}</h3>
            <a class="radius-btn" @click="onTagClick(item)" v-for="item in tagsList" :key="item"
              :href="`/tags/${item}`">{{ item }}
            </a>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flattenDepth from 'lodash/flattenDepth'
export default {
  name: 'TagsCollections',

  data() {
    return {
      isLoading: false,
      tagsList: [],
    }
  },

  created() {
    this.$apis
      .getAllTags()
      .then((result) => {
        this.tagsList = flattenDepth(result.sort())
      })
      .catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      })
  },

  mounted() {
    this.$setPageTitle(this.$t('tagsCollection'))
  },

  methods: {
    onTagClick(item) {
      this.$gtagTracking(`tags-${item}`, 'collections-tags')
    }
  },
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

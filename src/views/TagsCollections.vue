<template>
  <div id="tags-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="classify-title">{{ $t('tagsCollection') }}</h3>
            <el-button class="radius-btn" v-for="(item, index) in tagsList" :key="item"
              type="text" @click="onItemClick(item)">{{ item }}
            </el-button>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsCollections',

  data () {
    return {
      isLoading: false,
      tagsList: []
    }
  },

  watch: {
  },

  created () {
    this.$apis.getAllTags().then(result => {
      this.tagsList = this.$_.flattenDepth(result.sort())
    }).catch((error) => {
      this.isLoading = false
      this.$message.error(`${error}`)
    })
  },

  mounted () {
  },

  methods: {
    onItemClick (tag) {
      this.$router.push(`/tags/${tag}`)
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#tags-coll-page{
  .entry-list{
    padding: 15px;
    .classify-title{
      font-size: $font-large;
      font-weight: 500;
      margin: 15px auto;
    }
  }
}
</style>

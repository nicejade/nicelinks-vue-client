<template>
  <div class="load-more">
    <el-button
      type="primary"
      icon="plus"
      size="large"
      v-if="isShowLoadMore"
      @click="onLoadMoreClick"
      >{{ $t('loadMoreStr') }}
    </el-button>
    <el-alert v-else :title="$t('noMoreDataTip')" type="info"> </el-alert>
  </div>
</template>

<script>
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'LoadMore',

  mixins: [partsMixin],

  computed: {
    isShowLoadMore() {
      return this.$store && this.$store.state.isLoadMore
    },
  },

  methods: {
    onLoadMoreClick() {
      const pageCount = this.$requestParamList.pageCount + 1
      this.$fetchSearch({ pageCount }, true)
    },
  },

  locales: {
    zh: {
      noMoreDataTip: '嘿，云集美好，我是有底线的',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/variables.scss';

.load-more {
  width: 70%;
  margin: auto;
  padding: 2rem 0;

  .el-button {
    background-color: #ffffff;
    color: $black;
    transition: 1s border ease-in;
    border-radius: 20px;
    border: 1px solid $entry-btn-grey;
    width: 80%;

    &:hover {
      border: 1px solid $entry-btn-hover;
    }
  }

  .el-alert {
    border-radius: 20px;
  }
}
</style>

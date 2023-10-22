<template>
  <div class="wrapper" id="recommend">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="recommend-desc">
              <h2 align="left" class="subtitle">
                <strong>{{ $t('officialRecommend') }}</strong>
              </h2>
              <preview-md v-once :value="pageDescStr"></preview-md>
            </div>
            <links-list :is-abstract="true" :pdata="pastLinksArray" :is-loading="isLoading" />
            <pagination :count="linksCount" :page="currentPage" />
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/Pagination'
import PreviewMd from 'components/markdown/PreviewMd.vue'

import DEFAULT_CONF from './../config/default'
import { parse } from 'helper/marked'

const pageDescStr = ` [倾城之链](https://nicelinks.site/) ：旨在云集全球**优秀网站**，探索互联网中更广阔的世界；年与时驰间，已经收录优质网站千余款；历经岁月洗礼，或与当初有颇大变化； [倾城之链 - 官方推荐](https://nicelinks.site/recommend) ，将其中持续更新，给用户带来价值的部分，汇聚在此，以做推荐。`

export default {
  name: 'Recommend',

  data() {
    return {
      pageDescStr: pageDescStr,
      linksCount: 100,
      currentPage: 1,
      pastLinksArray: [],
    }
  },

  components: {
    PreviewMd,
    Pagination,
  },

  created() {
    this.currentPage = parseInt(this.$util.getUrlParam('page')) || 1

    this.fetchRecommendLinks({
      pageSize: 10,
      pageCount: this.currentPage,
      sortType: -1,
      sortTarget: 'created',
    })
  },

  mounted() {
    this.$setPageTitleStr(this.$t('officialRecommend'))
    const descNode = document.querySelector('meta[name="description"]')
    descNode.setAttribute('content', parse(this.pageDescStr).replace(/<[^>]*>/g, ''))
  },

  methods: {
    fetchRecommendLinks(params) {
      this.isLoading = true
      this.$apis
        .getRecommendLinks(params)
        .then((result) => {
          if (!result || result.count <= 0) {
            return this.pastLinksArray = []
          }
          this.linksCount = result.count
          this.pastLinksArray = Object.freeze(result.data)
        })
        .catch((error) => {
          this.$message.error(`${error}`)
          this.pastLinksArray = DEFAULT_CONF
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

#recommend {
  .entry-list {
    position: relative;

    .recommend-desc {
      padding: 18px 20px;
      border-bottom: 1px solid $item-border-color;

      .subtitle {
        padding-bottom: 10px;
      }
    }
  }
}
</style>

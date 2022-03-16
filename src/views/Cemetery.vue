<template>
  <div class="wrapper" id="cemetery">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="cemetery-desc">
              <mark>
                <h2 align="left" class="subtitle">
                  <strong>{{ $t('productCemetery') }}</strong>
                </h2>
                <preview-md v-once :value="cemeteryDescStr"></preview-md>
              </mark>
            </div>
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
import marked from 'marked'
import PreviewMd from 'components/markdown/PreviewMd.vue'

const cemeteryDescStr = `天地不仁，以万物为刍狗。年与时驰间，[倾城之链](https://nicelinks.site/)所收录的优质网站，也难逃时间洗礼；其中诸多内容，因为各种缘由而消隐逝去；[倾城之链 - 产品公墓](https://nicelinks.site/cemetery)，就是将不再能访问的、可能永远被人遗忘的产品列出来，留个纪念，缅怀过往。`

export default {
  name: 'Cemetery',

  mixins: [],

  data() {
    return {
      pastLinksArray: [],
      cemeteryDescStr: cemeteryDescStr,
    }
  },

  components: {
    PreviewMd,
  },

  watch: {},

  created() {
    this.fetchPastLinks({
      alive: 0,
      pageSize: 100,
      pageCount: 1,
      sortType: -1,
      sortTarget: 'created',
      userId: (this.userInfo && this.userInfo._id) || '',
    })
  },

  mounted() {
    document.title = `${this.$t('productCemetery')} - ${this.$t('niceLinksStr')}`
    const descNode = document.querySelector('meta[name="description"]')
    descNode.setAttribute(
      'content',
      marked(this.cemeteryDescStr, {
        sanitize: false,
      }).replace(/<[^>]*>/g, '')
    )
  },

  methods: {
    fetchPastLinks(params) {
      this.isLoading = true
      this.$apis
        .getNiceLinks(params)
        .then((result) => {
          if (!result || result.length <= 0) {
            this.pastLinksArray = []
            return
          } else {
            this.pastLinksArray = Object.freeze(result)
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
    .cemetery-desc {
      padding: 18px 20px;
      border-bottom: 1px solid $item-border-color;
      .subtitle {
        padding-bottom: 10px;
      }
    }
  }
}
</style>

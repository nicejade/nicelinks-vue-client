<template>
  <div class="similar-recommend" v-if="linksArr.length > 0">
    <h2 class="title">猜您可能喜欢</h2>
    <div class="list-item" v-for="item in linksArr" :key="item._id">
      <router-link
        class="gtag-track jump-link"
        data-action="route-entry"
        data-category="recommend"
        data-label="route-entry"
        :to="getAssembleRoute(item)"
      >
        <div class="screenshot">
          <div class="image-placeholder" v-show="isShowPlaceholder">
            <strong>图片加载中...</strong>
          </div>
          <img
            v-show="!isShowPlaceholder"
            class="image"
            :alt="getImgAlt(item)"
            :src="getScreenshotPath(item)"
            onerror="javascript:this.src='https://oss.nicelinks.site/nicelinks.site.png';"
          />
        </div>
        <div class="meta">
          <h3 class="title">{{ getAssembleTitle(item) }}</h3>
          <div class="desc">{{ getAssembleDesc(item) }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getHostnameByUrl, interceptString } from './../helper/tool'
import { NICE_LINKS_NAME } from './../config/constant'
import pageMixin from 'mixins/pageMixin.js'
import marked from 'marked'

export default {
  name: 'SimilarRecommend',

  mixins: [pageMixin],

  data() {
    return {
      linksArr: [],
      RECOMMEND_NUM: 5,
      isShowPlaceholder: true,
    }
  },

  props: {
    pdata: {
      type: [Array, Object],
      default: () => {
        return []
      },
    },
  },

  watch: {
    pdata() {
      this.fetchSimilarTagLinks()
    },
  },

  mounted() {
    setTimeout(() => {
      this.isShowPlaceholder = false
    }, 300)
  },

  components: {},

  methods: {
    assembleSimilarLinks(resArr) {
      const tempArr = resArr.filter((item) => {
        return item._id !== this.pdata._id
      })
      this.linksArr = Object.freeze(tempArr.slice(0, this.RECOMMEND_NUM))
    },

    fetchSimilarTagLinks() {
      this.$apis
        .getLinksByTag({
          active: true,
          alive: true,
          pageCount: 1,
          pageSize: this.RECOMMEND_NUM + 1,
          sortType: 1,
          sortTarget: 'created',
          tags: this.pdata.tags[0],
        })
        .then((res) => {
          this.assembleSimilarLinks(res)
        })
        .catch((error) => {
          console.error(`Something Error @fetchSimilarTagLinks：`, error)
        })
        .finally(() => {})
    },

    getAssembleTitle(item) {
      const limit = this.$isMobile ? 30 : 50
      return interceptString(item.title, limit)
    },

    getImgAlt(item) {
      return `${item.title} - ${NICE_LINKS_NAME}`
    },

    getAssembleDesc(item) {
      const limit = this.$isMobile ? 40 : 60
      const content =
        marked(item.review, {
          sanitize: false,
        }).replace(/<[^>]*>/g, '') || item.desc
      return interceptString(content, limit)
    },

    getAssembleRoute(item) {
      return `/post/${item._id}`
    },

    getScreenshotPath(item) {
      const urlPath = getHostnameByUrl(item.urlPath)
      return `https://oss.nicelinks.site/${urlPath}.png?x-oss-process=style/png2jpg&imageView2/1/w/320/h/180/interlace/1/ignore-error/1`
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.similar-recommend {
  width: 100%;
  padding: 15px 20px;

  .title {
    font-size: $font-large;
    color: $black;
    text-align: left;
    font-weight: 500;
    padding: 10px 0;
  }

  .jump-link {
    @include flex-box-center(row, space-between, center);
    height: 100%;
    padding: 1rem;
  }

  .list-item {
    width: 100%;
    height: 9rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    margin: 1.2rem auto;
    box-sizing: content-box;
    @include flex-box-center(column, center, inherit);

    .screenshot {
      position: relative;
      width: 20%;
      height: 6rem;

      .image-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        @include flex-box-center(row, center, center);
        width: 100%;
        height: 100%;
        background-color: $white-grey;
        color: $silver-grey;
      }

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .meta {
      width: 78%;
      height: 100%;
      @include flex-box-center(column, space-between, flex-start);
      text-align: left;

      .title {
        width: 100%;
        font-size: $font-medium;
        line-height: $font-large;
        color: $link-title;
        margin: 0;
        padding: 0;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .desc {
        color: #9393aa;
        font-size: 1.6rem;
        line-height: 1.8rem;
        word-spacing: 2px;
      }
    }
  }
}

@media (max-width: 768px) {
  .similar-recommend .list-item {
    height: 10rem;
  }
}
</style>

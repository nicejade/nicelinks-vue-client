<template>
  <div class="similar-recommend" v-if="linksArr.length > 0">
    <h2 class="page-second-title">猜您可能喜欢</h2>
    <div class="list-item" v-for="item in linksArr" :key="item._id">
      <router-link @click.native="onSimilarClick" class="recommend-link" :to="getAssembleRoute(item)">
        <div class="screenshot">
          <div class="image-placeholder" v-show="isShowPlaceholder">
            <strong>图片加载中...</strong>
          </div>
          <img v-show="!isShowPlaceholder" class="image" :alt="getImgAlt(item)" :src="getScreenshotPath(item)"
            onerror="javascript:this.src='https://nicelinks.oss-cn-shenzhen.aliyuncs.com/nicelinks.site.png';" />
        </div>
        <div class="meta">
          <h3 class="title">{{ getAssembleTitle(item) }}</h3>
          <div class="desc" style="-webkit-box-orient: vertical;">{{ getAssembleDesc(item) }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getHostnameByUrl, interceptString } from './../helper/tool'
import { NICE_LINKS, NICE_LINKS_NAME, DESCRIPTION } from './../config/constant'
import { parse } from 'helper/marked'

const DEFAULT_LINKS_ARR = []
  ;[0, 1, 2, 3, 4].map(() => {
    DEFAULT_LINKS_ARR.push({
      urlPath: NICE_LINKS,
      item: NICE_LINKS_NAME,
      desc: DESCRIPTION,
      _id: '5aa2579e56ee0d60651820c5',
      review: DESCRIPTION,
    })
  })

export default {
  name: 'SimilarRecommend',

  data() {
    return {
      linksArr: Object.freeze(DEFAULT_LINKS_ARR),
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
        .finally(() => { })
    },

    getImgAlt(item) {
      return `${item.title} - ${NICE_LINKS_NAME}`
    },

    getAssembleTitle(item) {
      return interceptString(item.title)
    },

    getAssembleDesc(item) {
      const content = parse(item.review).replace(/<[^>]*>/g, '') || item.desc
      return interceptString(content)
    },

    getAssembleRoute(item) {
      return `/post/${item._id}`
    },

    getScreenshotPath(item) {
      const urlPath = getHostnameByUrl(item.urlPath)
      return `https://nicelinks.oss-cn-shenzhen.aliyuncs.com/${urlPath}.png?x-oss-process=style/png2jpg&imageView2/1/w/320/h/180/interlace/1/ignore-error/1`
    },

    onSimilarClick() {
      this.$gtagTracking('similar-recommend', 'post')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.similar-recommend {
  width: 100%;
  padding: 0 2rem;

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
        aspect-ratio: 16 / 9;
        background-color: $white-grey;
        color: $silver-grey;
      }

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .recommend-link {
      @include flex-box-center(row, space-between, center);
      height: 100%;
      padding: 1rem;
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
        @include text-ellipsis-multiline(2);
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

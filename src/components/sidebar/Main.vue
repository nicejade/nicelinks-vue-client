<template>
  <aside class="aside-list">
    <h2 class="aside-widget-title" style="margin-top: 1rem;padding: 0.3rem; 0">广而告之</h2>
    <AdsPosition :adverts-list="advertsList" />
    <h2 class="aside-widget-title">{{ $t('friendshipLinks') }}</h2>
    <friendship-links class="sub-content" />
    <h2 class="aside-widget-title">{{ $t('awesomeSentence') }}</h2>
    <awesome-sentence class="sub-content" :sentence="sentence" :index="index" />
    <h2 class="aside-widget-title">推荐投稿</h2>
    <SitesRecommend class="sub-content" />
    <h2 class="aside-widget-title">{{ $t('rewardme') }}</h2>
    <reward-me class="sub-content" />
    <h2 class="aside-widget-title">{{ $t('miniprogramCode') }}</h2>
    <div class="sub-content">
      <img
        class="miniprogram"
        alt="倾城之链.小程序"
        src="https://image.nicelinks.site/nicelinks-miniprogram-code.jpeg?imageView2/1/w/250/h/250/interlace/1/ignore-error/1"
      />
    </div>
    <h2 class="aside-widget-title">{{ $t('aboutNiceLinks') }}</h2>
    <div class="sub-content about-us">
      <a href="/explore/all?sort=hottest">倾城之链</a
      >，优质网站导航平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。
    </div>
  </aside>
</template>

<script>
import AdsPosition from './AdsPosition'
import FriendshipLinks from './FriendshipLinks'
import RewardMe from './RewardMe'
import AwesomeSentence from './AwesomeSentence'
import SitesRecommend from './SitesRecommend'

export default {
  name: 'Main',

  data() {
    return {
      advertsList: [],
      activeNames: ['awesomeSentence', 'recommend', 'miniprogramCode', 'friendshipLinks'],
      sentence: '',
    }
  },

  props: {
    index: {
      type: [Number],
      default: 1,
    },
  },

  components: {
    AdsPosition,
    FriendshipLinks,
    RewardMe,
    AwesomeSentence,
    SitesRecommend,
  },

  created() {
    this.$apis
      .getSysConf()
      .then((result) => {
        const cAdvertsList = result.advertsList.sort((a, b) => {
          return a.sort - b.sort
        })

        this.advertsList = Object.freeze(cAdvertsList)
        this.sentence = Object.freeze(result.sentence)
      })
      .catch((error) => {
        this.$message.error(`${error}`)
      })
  },

  mounted() {
    const isMobile = window.innerWidth <= 768
    isMobile && this.activeNames.push('rewardme')
  },
}
</script>

<style type="text/css" lang="scss">
@import './../../assets/scss/variables.scss';

.el-carousel__item {
  text-align: center;
}

.aside-list {
  background-color: $white;
  display: inline-block;
  max-width: 32rem;
  width: 31%;
  text-align: left;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  padding: 0 1.5rem;

  .sub-content {
    margin: 1rem auto;
    text-align: center;
  }

  .aside-list-li {
    list-style-type: bengali;
  }

  .aside-list-a {
    color: $common-link;
    font-size: $font-medium;
  }

  .miniprogram {
    display: inline-block;
    width: 25rem;
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .about-us {
    color: $black;
    font-size: $font-small;
    line-height: 24px;
    font-weight: 400;
    text-align: left;
  }
}
</style>

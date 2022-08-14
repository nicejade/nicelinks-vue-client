<template>
  <aside class="aside-list">
    <ads-position :adverts-list="advertsList"></ads-position>
    <h2 class="aside-widget-title">推荐投稿</h2>
    <SitesRecommend class="sub-content" />
    <h2 class="aside-widget-title">{{ $t('awesomeSentence') }}</h2>
    <awesome-sentence class="sub-content" :sentence="sentence" :index="index" />
    <h2 class="aside-widget-title">{{ $t('friendshipLinks') }}</h2>
    <friendship-links class="sub-content" />
    <h2 class="aside-widget-title">{{ $t('miniprogramCode') }}</h2>
    <div class="text-center">
      <img
        alt="倾城之链.小程序"
        src="https://image.nicelinks.site/nicelinks-miniprogram-code.jpeg?imageView2/1/w/250/h/250/interlace/1/ignore-error/1"
      />
    </div>
    <h2 class="aside-widget-title">{{ $t('rewardme') }}</h2>
    <reward-me class="sub-content" />
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

  computed: {
    isShowFriendFlag() {
      return !this.$isFromQuickapp()
    },
  },

  watch: {},

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
  max-width: 360px;
  width: 32%;
  text-align: left;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  padding: 0 1.5rem;

  .sub-content {
    margin: 2rem auto;
    text-align: center;
  }

  .aside-list-li {
    list-style-type: bengali;
  }

  .aside-list-a {
    color: $common-link;
    font-size: $font-medium;
  }
}
</style>

<template>
  <div class="sidebar">
    <AdsPosition :adverts-list="advertsList" />
    <AwesomeSentence :sentence="sentence" :index="index" />
    <SitesRecommend />
    <FriendsLinks :friends-list="friendsList" />
    <RewardMe />
    <aside class="sidebar-aside">
      <h2 class="aside-widget-title">{{ $t('miniprogramCode') }}</h2>
      <div class="text-center">
        <img
          class="miniprogram"
          alt="倾城之链.小程序"
          src="https://image.nicelinks.site/nicelinks-miniprogram-code.jpeg?imageView2/1/w/250/h/250/interlace/1/ignore-error/1"
        />
      </div>
    </aside>
    <aside class="sidebar-aside" style="margin-bottom: 0;">
      <h2 class="aside-widget-title">{{ $t('aboutNiceLinks') }}</h2>
      <div class="about-us">
        <a href="/explore/all?sort=hottest">倾城之链</a
        >，优质网站导航平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。
      </div>
    </aside>
  </div>
</template>

<script>
import AdsPosition from './AdsPosition'
import FriendsLinks from './FriendsLinks'
import RewardMe from './RewardMe'
import AwesomeSentence from './AwesomeSentence'
import SitesRecommend from './SitesRecommend'

export default {
  name: 'Sidebar',

  data() {
    return {
      advertsList: [],
      sentence: '',
      friendsList: [],
    }
  },

  props: {
    index: {
      type: Number,
      default: 1,
    },
  },

  components: {
    AdsPosition,
    FriendsLinks,
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
        this.friendsList = Object.freeze(result.friendsList)
      })
      .catch((error) => {
        this.$message.error(`${error}`)
      })
  },
}
</script>

<style type="text/css" lang="scss">
@import './../../assets/scss/variables.scss';

.el-carousel__item {
  text-align: center;
}

.sidebar {
  background-color: $white;
  display: inline-block;
  max-width: 32rem;
  width: 31%;
  text-align: left;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

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

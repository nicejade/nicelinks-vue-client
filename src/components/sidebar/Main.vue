<template>
  <aside class="aside-list">
    <ads-position :adverts-list="advertsList"></ads-position>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="$t('awesomeSentence')" name="awesomeSentence">
        <awesome-sentence :sentence="sentence" />
      </el-collapse-item>
      <el-collapse-item :title="$t('miniprogramCode')" name="miniprogramCode">
        <img src="https://image.nicelinks.site/nicelinks-miniprogram-code.jpeg?imageView2/1/w/250/h/250/interlace/1/ignore-error/1" alt="倾城之链.小程序">
      </el-collapse-item>
      <el-collapse-item :title="$t('friendshipLinks')" name="friendshipLinks"
        v-if="isShowFriendFlag">
        <friendship-links />
      </el-collapse-item>
      <el-collapse-item :title="$t('rewardme')" name="rewardme">
        <reward-me :show="activeNames.includes('rewardme')" />
      </el-collapse-item>
    </el-collapse>
  </aside>
</template>

<script>
import AdsPosition from './AdsPosition'
import FriendshipLinks from './FriendshipLinks'
import RewardMe from './RewardMe'
import AwesomeSentence from './AwesomeSentence'

export default {
  name: 'Sidebar',

  data () {
    return {
      activeNames: ['awesomeSentence', 'miniprogramCode', 'friendshipLinks'],
      advertsList: [],
      sentence: {}
    }
  },

  computed: {
    isShowFriendFlag () {
      return !this.$isFromQuickapp()
    }
  },

  watch: {
  },

  components: {
    AdsPosition,
    FriendshipLinks,
    RewardMe,
    AwesomeSentence
  },

  created () {
    this.$apis.getSysConf().then(result => {
      this.advertsList = result.advertsList.sort((a, b) => {
        return a.sort - b.sort
      })

      this.sentence = result.sentence
    }).catch((error) => {
      this.$message.error(`${error}`)
    })
  },

  mounted () {
    const isMobile = window.innerWidth <= 768
    isMobile && this.activeNames.push('rewardme')
  },

  methods: {
    handleChange () {}
  }
}
</script>

<style type="text/css" lang="scss">
@import "./../../assets/scss/variables.scss";

.aside-list{
  background-color: $white;
  display: inline-block;
  max-width: 360px;
  width: 32%;
  float: right;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,.1);
  .aside-list-li{
    list-style-type: bengali;
  }
  .aside-list-a{
    color: $common-link;
    font-size: $font-medium;
  }
  .el-collapse-item__header{
    text-align: left;
    font-size: $font-medium;
  }
}
</style>

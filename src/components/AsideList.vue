<template>
  <aside class="aside-list">
    <ads-position :adverts-list="advertsList"></ads-position>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="$t('friendshipLinks')" name="friendshipLinks">
        <friendship-links></friendship-links>
      </el-collapse-item>
      <el-collapse-item :title="$t('rewardme')" name="rewardme">
        <reward-me></reward-me>
      </el-collapse-item>
    </el-collapse>
  </aside>
</template>

<script>
import AdsPosition from 'components/AdsPosition'
import FriendshipLinks from 'components/FriendshipLinks'
import RewardMe from 'components/RewardMe'

export default {
  name: 'AsideList',
  data () {
    return {
      advertsList: [],
      activeNames: ['friendshipLinks']
    }
  },

  watch: {
  },

  created () {
    this.$apis.getSysConf().then(result => {
      this.advertsList = result.advertsList.sort((a, b) => {
        return a.sort - b.sort
      })
    }).catch((error) => {
      this.$message.error(`${error}`)
    })
  },

  components: {
    AdsPosition,
    FriendshipLinks,
    RewardMe
  },

  mounted () {
  },

  methods: {
    handleChange () {}
  }
}
</script>

<style type="text/css" lang="scss">
@import "./../assets/scss/variables.scss";

.aside-list{
  background-color: $white;
  display: inline-block;
  max-width: 360px;
  width: 32%;
  float: right;
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

<template>
  <div class="wrapper">
    <a href="javascript:;" class="button" @click="onRewardMeClick">Reward Me</a>
    <div id="reward-me">
      <div id="reward" @click="onTurnClick">
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="reward-select">
        <el-radio class="radio" v-model="payWay" label="weixin">
          <icon class="icons" name="pay-weixin"></icon>
        </el-radio>
        <el-radio class="radio" v-model="payWay" label="zhifubao">
          <icon class="icons" name="pay-zhifubao"></icon>
        </el-radio>
      </div>
    </div>
  </div>
</template>

<script>
import { $document } from 'helper'

export default {
  name: 'rewardMe',
  data () {
    return {
      title: '晚晴幽草轩',
      payWay: 'weixin'
    }
  },

  components: {
  },

  watch: {
    'payWay' (newVal, oldVal) {
      let $reward = document.getElementById('reward')
      if (newVal !== 'weixin') {
        $document.addClass($reward, 'flipped')
      } else {
        $document.removeClass($reward, 'flipped')
      }
    }
  },

  methods: {
    onRewardMeClick () {
      let $rewardMe = document.getElementById('reward-me')
      $rewardMe.style.display = 'block'
      $document.toggleClass($rewardMe, 'show')
    },

    onTurnClick () {
      this.payWay = (this.payWay === 'weixin') ? 'zhifubao' : 'weixin'
      let $reward = document.getElementById('reward')
      $document.toggleClass($reward, 'flipped')
    }
  }
}
</script>

<style lang="scss">
.reward-select .radio{
  margin: auto 15px;
  .el-radio__input{
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    left: -10px;
  }
}
</style>

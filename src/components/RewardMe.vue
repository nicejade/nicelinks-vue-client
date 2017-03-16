<template>
  <div class="wrapper">
    <a href="#loved-reward" class="button">Reward Me</a>
    <div id="loved-reward">
      <div class="reward-modal-shadow" @click.stop="onCloseClick"></div>
      <div id="reward-me">
        <div id="reward" @click="onTurnClick">
          <div class="front"><img class="reward-img" :src="rewardArr[0].imgPath" :alt="rewardArr[0].altText"></div>
          <div class="back"><img class="reward-img" :src="rewardArr[1].imgPath" :alt="rewardArr[1].altText"></div>
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
  </div>
</template>

<script>
import { $document } from 'helper'
import { $config } from 'config'

export default {
  name: 'rewardMe',
  data () {
    return {
      title: '晚晴幽草轩',
      payWay: 'weixin',
      rewardArr: $config.reward
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
    onTurnClick () {
      this.payWay = (this.payWay === 'weixin') ? 'zhifubao' : 'weixin'
      let $reward = document.getElementById('reward')
      $document.toggleClass($reward, 'flipped')
    },

    onCloseClick () {
      window.history.go(-1)
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

<template>
  <div id="reward-me">
    <div id="reward" @click="onTurnClick">
      <div class="front">
        <img class="reward-img" :src="rewardArr[0].imgPath" :alt="rewardArr[0].altText" />
      </div>
      <div class="back">
        <img class="reward-img" :src="rewardArr[1].imgPath" :alt="rewardArr[1].altText" />
      </div>
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
</template>

<script>
import { toggleClass, addClass, removeClass } from './../../helper/document'
import REWARD_CONF from './../../config/reward'
import Vue from 'vue'
import { Radio } from 'element-ui'
Vue.use(Radio)

export default {
  name: 'RewardMe',

  data() {
    return {
      payWay: 'weixin',
      rewardArr: Object.freeze(REWARD_CONF),
    }
  },

  watch: {
    payWay(newVal, oldVal) {
      let $reward = document.getElementById('reward')
      if (newVal !== 'weixin') {
        addClass($reward, 'flipped')
      } else {
        removeClass($reward, 'flipped')
      }
    },
  },

  methods: {
    onTurnClick() {
      this.$gtagTracking('reward-turn-click', 'aside')

      this.payWay = this.payWay === 'weixin' ? 'zhifubao' : 'weixin'
      const $reward = document.getElementById('reward')
      toggleClass($reward, 'flipped')
    },
  },
}
</script>

<style lang="scss">
@import './../../assets/scss/mixins.scss';

#reward-me {
  width: 100%;
  height: 300px;
  opacity: 1;
  margin: auto;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -o-perspective: 800px;
  perspective: 800px;
}

#reward {
  width: 100%;
  height: 266px;
  -webkit-transition: -webkit-transform 1s;
  -moz-transition: -moz-transform 1s;
  -o-transition: -o-transform 1s;
  transition: transform 1s;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#reward .front,
#reward .back {
  height: 100%;
  width: 100%;
  position: absolute;
  line-height: 260px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 140px;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}

#reward .front .reward-img,
#reward .back .reward-img {
  display: inline-block;
  width: 25rem;
  height: auto;
  aspect-ratio: 1 / 1;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

#reward .back {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

#reward.flipped {
  -webkit-transform: translateX(100%) rotateY(180deg);
  -moz-transform: translateX(100%) rotateY(180deg);
  -o-transform: translateX(100%) rotateY(180deg);
  transform: translateX(100%) rotateY(180deg);
}

#loved-reward #reward-me {
  width: 100%;
  height: 266px;
  opacity: 1;
  transition: height 1s, opacity 2s;
}

.reward-select {
  height: 45px;
  width: 100%;
  text-align: center;

  .el-radio {
    margin: 0 10px;
  }

  .radio,
  .checkbox {
    display: inline-block;
  }

  .el-radio__input {
    height: 36px;
  }

  input {
    display: inline-block;
  }
}
</style>

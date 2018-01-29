<template>
  <div id="reward-me">
    <div id="reward" @click="onTurnClick" ga-on="click" ga-event-category="reward-me" ga-event-action="click" ga-event-label="turn reward card">
      <div class="front"><img class="reward-img" :src="rewardArr[0].imgPath" :alt="rewardArr[0].altText"></div>
      <div class="back"><img class="reward-img" :src="rewardArr[1].imgPath" :alt="rewardArr[1].altText"></div>
    </div>
    <div class="reward-select">
      <el-radio class="radio" v-model="payWay" label="weixin" ga-event-category="reward-me" ga-event-action="click" ga-event-label="switch pay to weixin">
        <icon class="icons" name="pay-weixin"></icon>
      </el-radio>
      <el-radio class="radio" v-model="payWay" label="zhifubao" ga-event-category="reward-me" ga-event-action="click" ga-event-label="switch pay to zhifubao">
        <icon class="icons" name="pay-zhifubao"></icon>
      </el-radio>
    </div>
  </div>
</template>

<script>
import { $document } from 'helper'
import $config from 'config'

export default {
  name: 'RewardMe',
  data () {
    return {
      payWay: 'weixin',
      rewardArr: $config.reward
    }
  },

  components: {
  },

  watch: {
    payWay (newVal, oldVal) {
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
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/mixins.scss";
#reward-me{
  width: 300px;
  height: 345px;
  opacity: 1;
  margin: auto;
  -webkit-perspective:800px;
     -moz-perspective:800px;
       -o-perspective:800px;
          perspective:800px;
}
#reward {
  width: 100%;
  height: 300px;
  border: 1px solid #CCC;
  -webkit-transition:-webkit-transform 1s;
     -moz-transition:-moz-transform 1s;
       -o-transition:-o-transform 1s;
          transition:transform 1s;
  -webkit-transform-style:preserve-3d;
     -moz-transform-style:preserve-3d;
       -o-transform-style:preserve-3d;
          transform-style:preserve-3d;
  -webkit-transform-origin:left center;
     -moz-transform-origin:left center;
       -o-transform-origin:left center;
          transform-origin:left center;
}
#reward .front, #reward .back{
  height: 100%;
  width: 100%;
  position: absolute;
  line-height: 260px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 140px;
  -webkit-backface-visibility:hidden;
     -moz-backface-visibility:hidden;
       -o-backface-visibility:hidden;
          backface-visibility:hidden;
}
#reward .front .reward-img{
  width: 100%;
}
#reward .back .reward-img{
  width: 100%;
}
#reward .back {
  -webkit-transform:rotateY(180deg);
     -moz-transform:rotateY(180deg);
       -o-transform:rotateY(180deg);
          transform:rotateY(180deg);
}
#reward.flipped {
  -webkit-transform:translateX(100%) rotateY(180deg);
     -moz-transform:translateX(100%) rotateY(180deg);
       -o-transform:translateX(100%) rotateY(180deg);
          transform:translateX(100%) rotateY(180deg);
}
#loved-reward #reward-me{
  width: 300px;
  height: 300px;
  opacity: 1;
  transition: height 1s, opacity 2s;
}
.reward-select {
  height: 45px;
  width: 100%;
  padding-top: 10px;
  .el-radio {
    margin: 0 10px;
  }
  .radio, .checkbox{
    display: inline-block;
  }
  .el-radio__input{
    height: 36px;
  }
  input {
    display: inline-block;
  }
}
</style>

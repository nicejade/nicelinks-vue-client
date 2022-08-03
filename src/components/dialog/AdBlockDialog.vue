<template>
  <div class="block-tip-dialog">
    <div class="dlg-header">
      <h2 class="title">
        若此弹框悬浮出来，多是由 AdBlock 触发
      </h2>
      <p class="warm-reminder">您可将本站加入白名单，解除广告屏蔽（ABP），感谢支持</p>
      <button type="button" class="btn-close" @click="onCloseClick">
        <span class="icon-cross"></span>
      </button>
    </div>
    <div class="pannel">
      <div class="item">
        <img class="qrcode" src="/static/img/reward_wexin.jpg" alt="微信打赏" />
        <strong class="text font-medium">“月黑见渔灯，</strong>
        <span class="text font-medium">微信打赏</span>
      </div>
      <div class="item">
        <img class="qrcode" src="/static/img/reward_zhifubao.jpg" alt="倾城之链-小程序" />
        <strong class="text font-medium">“孤光一点萤。”</strong>
        <span class="text font-medium">支付宝打赏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdBlockDialog',

  methods: {
    onCloseClick() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables.scss';
$factor: 0.5rem;

@mixin cross($size: 20px, $color: currentColor, $thickness: 1px) {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  position: relative;
  width: $size;
  height: $size;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: ($size - $thickness) / 2;
    left: 0;
    right: 0;
    height: $thickness;
    background: $color;
    border-radius: $thickness;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
  span {
    display: block;
  }
}

.block-tip-dialog {
  position: fixed;
  top: 1.5 * $header-height;
  left: 50%;
  transform: translateX(-50%);
  width: 100 * $factor;
  height: 68 * $factor;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: $white;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.618);
  animation: moveto 0.618s;
  -webkit-animation: moveto 0.618s;
  animation-timing-function: cubic-bezier(0, 0.13, 0.14, 1);
  padding: 2 * $factor;
  border-radius: 2 * $factor;
  z-index: $zindex-auto-dialog;
  .dlg-header {
    width: 100%;
    position: relative;
    .title {
      font-size: $font-large;
      font-weight: 500;
    }
    .warm-reminder {
      margin: 2 * $factor 0;
    }
    .btn-close {
      position: absolute;
      top: -10 * $factor;
      right: -6 * $factor;
      width: 8 * $factor;
      height: 8 * $factor;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      margin: 0;
      border: 0;
      padding: 0;
      background-color: $producthunt;
      border-radius: 50%;
      cursor: pointer;
      transition: all 150ms;
      .icon-cross {
        @include cross(26px, #fff, 1px);
      }
      &:hover,
      &:focus {
        transform: rotateZ(90deg);
        background-color: $red;
      }
    }
  }
  .pannel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 40 * $factor;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 40 * $factor;
      height: 100%;
      .qrcode {
        width: 32 * $factor;
        height: 32 * $factor;
      }
      .text {
        font-size: $font-small;
        color: $common-link;
      }
    }
  }
}

@keyframes moveto {
  from {
    opacity: 0.618;
    top: -88 * $factor;
  }
  to {
    opacity: 1;
    top: 1.5 * $header-height;
  }
}
</style>

<template>
  <div class="auto-dialog">
    <div class="dlg-header">
      <h2 class="title">订阅倾城 每周精要</h2>
      <button type="button" class="btn-close" @click="onCloseClick">
        <span class="icon-cross"></span>
      </button>
    </div>
    <div class="pannel">
      <div class="item">
        <img
          class="qrcode"
          src="https://image.nicelinks.site/qrcode_jqx.jpg"
          alt="晚晴幽草轩-公众号"
        />
        <span class="text font-medium">晚晴幽草轩</span>
        <span class="text">微信扫码关注</span>
      </div>
      <div class="item">
        <img
          class="qrcode"
          src="https://image.nicelinks.site/nicelinks-miniprogram-code.jpeg?imageView2/1/w/250/h/250/interlace/1/ignore-error/1"
          alt="倾城之链-小程序"
        />
        <span class="text font-medium">倾城之链</span>
        <span class="text">微信扫码体验</span>
      </div>
    </div>
  </div>
</template>

<script>
import { AUTO_DIALOG } from 'config/constant'
export default {
  name: 'AutoDialog',

  methods: {
    onCloseClick() {
      this.$util.setLocalStorage(AUTO_DIALOG, true)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/variables.scss';
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

.auto-dialog {
  position: fixed;
  bottom: 28 * $factor;
  right: 8 * $factor;
  width: 80 * $factor;
  height: 60 * $factor;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: $white;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.618);
  animation: moveto 1s;
  -webkit-animation: moveto 1s;
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
      justify-content: space-between;
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
    right: -80 * $factor;
  }
  to {
    opacity: 1;
    right: 8 * $factor;
  }
}
</style>

<template>
  <div class="elevator">
    <div class="tooltip">
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
      <div class="connect outside-link-btn">
        <icon class="qrcode" name="qrcode"></icon>
      </div>
    </div>
    <a
      target="_blank"
      class="outside-link-btn gtag-track"
      data-action="recommend-btn"
      data-category="elevator"
      data-label="recommend-btn"
      rel="noopener"
      :href="reportPath"
      >投稿
    </a>
    <a
      target="_blank"
      class="outside-link-btn gtag-track"
      data-action="feedback-btn"
      data-category="elevator"
      data-label="feedback-btn"
      rel="noopener"
      :href="reportPath"
      >反馈
    </a>
  </div>
</template>

<script>
import { REPORT_PATH } from 'config/constant'
import pageMixin from 'mixins/pageMixin.js'

export default {
  name: 'Feedback',

  mixins: [pageMixin],

  data() {
    return {
      reportPath: REPORT_PATH,
    }
  },
}
</script>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
$factor: 1rem;

.elevator {
  position: fixed;
  bottom: 12 * $factor;
  right: 3 * $factor;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: $zindex-elevator;
}

.outside-link-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5 * $factor;
  height: 5 * $factor;
  border-radius: 50%;
  z-index: 999;
  text-align: center;
  font-weight: 900;
  font-size: inherit;
  font-family: inherit;
  color: $black;
  background-color: $white;
  word-break: keep-all;
  padding: 0.5em 1em;
  margin: 1rem 0;
  outline: none;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    animation: jelly 0.5s;
  }
}

.tooltip {
  position: relative;
  display: inline-block;
  &:hover {
    .pannel {
      visibility: visible;
    }
  }
  .pannel {
    position: absolute;
    bottom: -9.25 * $factor;
    right: 6 * $factor;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: $white;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    visibility: hidden;
    width: 40 * $factor;
    height: 26 * $factor;
    padding: 2 * $factor;
    border-radius: 2 * $factor;
    &:before {
      content: '';
      position: absolute;
      left: 100%;
      top: 12.5 * $factor;
      width: 0;
      height: 0;
      border-top: $factor solid transparent;
      border-left: $factor solid $white;
      border-bottom: $factor solid transparent;
    }
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 18 * $factor;
      height: 100%;
      .qrcode {
        width: 16 * $factor;
        height: 16 * $factor;
      }
      .text {
        font-size: 1.6 * $factor;
        color: $common-link;
      }
    }
  }
  .connect {
    .qrcode {
      width: 3 * $factor;
      height: 3 * $factor;
      transform: scale(1.2);
    }
  }
}
@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>

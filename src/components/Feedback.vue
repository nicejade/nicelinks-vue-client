<template>
  <div class="feedback-area">
    <a
      target="_blank"
      class="outside-link-btn gtag-track"
      data-action="recommend-btn"
      data-category="footer"
      data-label="recommend-btn"
      rel="noopener"
      :href="reportPath"
      >投稿
    </a>
    <a
      target="_blank"
      class="outside-link-btn gtag-track"
      data-action="feedback-btn"
      data-category="footer"
      data-label="feedback-btn"
      rel="noopener"
      :href="reportPath"
      >反馈
    </a>
  </div>
</template>

<script>
import { REPORT_PATH } from 'config/constant'
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'Feedback',

  mixins: [partsMixin],

  data() {
    return {
      reportPath: REPORT_PATH,
    }
  },
}
</script>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
.feedback-area {
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.outside-link-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
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
  outline: none;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    animation: jelly 0.5s;
  }
}
.outside-link-btn + .outside-link-btn {
  margin-top: 15px;
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

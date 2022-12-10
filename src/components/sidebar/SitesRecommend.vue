<template>
  <aside class="sidebar-aside" id="sites-recommend">
    <h2 class="aside-widget-title">推荐投稿</h2>
    <a
      target="_blank"
      class="nice-link-recommend"
      rel="noopener noreferrer"
      @click="onRecommendClick"
      :href="reportPath"
      >👍优质网站推荐
    </a>
  </aside>
</template>

<script>
import { REPORT_PATH } from 'config/constant'

export default {
  name: 'SitesRecommend',

  data() {
    return {
      reportPath: REPORT_PATH,
    }
  },

  methods: {
    onRecommendClick() {
      this.$gtagTracking('link-recommend', 'aside')
    },
  },
}
</script>

<style scoped lang="scss">
@import './../../assets/scss/variables.scss';

.nice-link-recommend {
  display: inline-block;
  width: 100%;
  height: 2rem;
  font-size: $font-large;
  color: $jade;
  font-weight: 500;
  margin: 1rem auto;
  text-align: center;
  letter-spacing: 1px;
  user-select: none;
  text-transform: uppercase;
  text-shadow: -15px 5px 20px $producthunt;
  transition: all 0.3s ease-out;
}

.nice-link-recommend:hover {
  text-shadow: 0px 6px 20px $producthunt;
}
</style>

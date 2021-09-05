<template>
  <div id="sites-recommend">
    <a
      target="_blank"
      class="nice-link-recommend gtag-track"
      rel="noopener"
      data-action="link-recommend"
      data-category="aside"
      data-label="link-recommend"
      :href="reportPath"
      >👍优质网站推荐
    </a>
  </div>
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
}
</script>

<style scoped lang="scss">
@import './../../assets/scss/variables.scss';
.nice-link-recommend {
  font-size: $font-large;
  color: $jade;
  font-weight: 500;
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

<template>
  <section class="nice-fantasy">
    <img class="hero" :src="niceImageSrc" :alt="$t('niceLinksStr')" />
  </section>
</template>

<script>
import { getRandomInt, specifiedPadding } from './../../helper/tool'

export default {
  name: 'NiceFantasy',

  computed: {
    niceImageSrc() {
      const primaryPath = `//image.lovejade.cn/jpg/nice-links-@#.jpg`
      const randomNum = getRandomInt(0, 149)
      const thePathKey = specifiedPadding(randomNum, 3, '0')
      const smallScreenParam = '?imageView2/1/w/640/h/360/interlace/1/ignore-error/1'
      const resultPath = primaryPath.replace('@#', thePathKey)
      return this.$isMobile ? resultPath + smallScreenParam : resultPath
    },
  },
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.nice-fantasy {
  position: relative;
  background-color: $black;

  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 50%;
    top: 0;
    left: 0;
    background-color: $white;
    margin-top: -1px;
  }

  .hero {
    position: relative;
    display: block;
    width: 90%;
    max-width: 1280;
    aspect-ratio: 16 / 9;
    margin: 0 auto;
    border-radius: 3px;
  }
}

@media (max-width: 768px) {
  .nice-fantasy {
    margin-top: 2em;
  }
}
</style>

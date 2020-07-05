<template>
  <section class="nice-fantasy">
    <img :src="niceImageSrc" :alt="$t('niceLinksStr')" />
  </section>
</template>

<script>
export default {
  name: 'NiceFantasy',

  data() {
    return {
      isMobile: window.innerWidth <= 960,
    }
  },

  computed: {
    niceImageSrc() {
      const primaryPath = `//image.nicelinks.site/jpg/nice-links-@#.jpg`
      const randomNum = this.$util.getRandomInt(0, 149)
      const thePathKey = this.$util.specifiedPadding(randomNum, 3, '0')
      const smallScreenParam = '?imageView2/1/w/640/h/360/interlace/1/ignore-error/1'
      const resultPath = primaryPath.replace('@#', thePathKey)
      return this.isMobile ? resultPath + smallScreenParam : resultPath
    },
  },

  components: {},

  created() {},

  methods: {},

  locales: {},
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
  img {
    position: relative;
    display: block;
    width: 90%;
    max-width: 1280;
    margin: 0 auto;
    border-radius: 3px;
  }
}
</style>

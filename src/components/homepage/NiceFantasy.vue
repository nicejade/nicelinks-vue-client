<template>
  <section class="nice-fantasy">
    <img src="//image.nicelinks.site/nice-fantasy.jpg" :alt="$t('niceLinksStr')">
  </section>
</template>

<script>

export default {
  name: 'NiceFantasy',

  data () {
    return {
      isMobile: window.innerWidth <= 960
    }
  },

  components: {
  },

  created () {
  },

  methods: {
  },

  locales: {
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import './../../assets/scss/mixins.scss';

.nice-fantasy{
  position: relative;
  background-color: $black;
  &:before{
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
  img{
    position: relative;
    display: block;
    width: 90%;
    max-width: 1280;
    margin: 0 auto;
    border-radius: 3px;
  }
}
</style>

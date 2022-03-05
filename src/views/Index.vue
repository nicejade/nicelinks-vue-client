<template>
  <div class="wrapper">
    <search class="mobile-search" v-if="$isMobileScreen()" />
    <HomeLotus :class="{ 'mobile-search-serving': isMobile }"></HomeLotus>
    <NiceFantasy></NiceFantasy>
    <Introduction></Introduction>
    <LinkCountup></LinkCountup>
  </div>
</template>

<script>
import HomeLotus from 'components/homepage/HomeLotus'
import NiceFantasy from 'components/homepage/NiceFantasy'
import Introduction from 'components/homepage/Introduction'
import LinkCountup from 'components/homepage/LinkCountup'

export default {
  name: 'Index',

  data() {
    return {
      isMobile: window.innerWidth <= 960,
    }
  },

  components: {
    HomeLotus,
    NiceFantasy,
    Introduction,
    LinkCountup,
  },

  beforeCreate() {},

  created() {},

  mounted() {},

  methods: {},
}
</script>

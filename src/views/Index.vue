<template>
  <div class="wrapper">
    <search class="mobile-search" v-if="$isMobile" />
    <HomeLotus :class="{ 'mobile-search-serving': $isMobile }"></HomeLotus>
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

  components: {
    HomeLotus,
    NiceFantasy,
    Introduction,
    LinkCountup,
  },
}
</script>

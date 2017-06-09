<template>
  <aside class="aside-list">
    <ads-position></ads-position>
  </aside>
</template>

<script>
import AdsPosition from 'components/AdsPosition'

export default {
  name: 'AsideList',
  data () {
    return {
    }
  },

  watch: {
  },

  components: {
    AdsPosition
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style type="text/css" lang="scss">
@import "./../assets/scss/variables.scss";

.aside-list{
  background-color: $entry-list-bg;
  display: inline-block;
  max-width: 360px;
  width: 32%;
  float: right;
}
</style>

<template>
  <div class="wrapper">
    <HomeLotus></HomeLotus>
    <NiceFantasy></NiceFantasy>
    <Introduction></Introduction>
    <LinkCountup></LinkCountup>
  </div>
</template>

<script>
import './../assets/css/flower.css'
import HomeLotus from 'components/homepage/HomeLotus'
import NiceFantasy from 'components/homepage/NiceFantasy'
import Introduction from 'components/homepage/Introduction'
import LinkCountup from 'components/homepage/LinkCountup'
import pageMixin from 'mixins/pageMixin.js'
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'Index',

  mixins: [pageMixin, metaMixin],

  data () {
    return {
    }
  },

  components: {
    HomeLotus,
    NiceFantasy,
    Introduction,
    LinkCountup
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';
</style>

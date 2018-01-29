<template>
  <div class="countup-area">
    <h2 class="medium-font">{{ $t('countupText') }}</h2>
    <CountUp
      class="countup-number"
      :start="0"
      :end="theDisplayCount"
      :decimals="0"
      :duration="2.5"
      :options="countUpoptions"
      @callback="onCountUpCallback">
    </CountUp>
  </div>
</template>

<script>
import CountUp from 'components/CountUp'

export default {
  name: 'LinkCountup',

  data () {
    return {
      isMobile: window.innerWidth <= 960,
      theDisplayCount: 0,
      totalLinksCount: 0,
      countUpoptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },

  components: {
    CountUp
  },

  created () {
    let params = {active: true}
    this.$apis.getAllLinksCount(params).then(result => {
      this.totalLinksCount = result
      this.handleDisplayCount()
    }).catch((error) => {
      this.totalLinksCount = 99
      this.handleDisplayCount()
      console.log(error)
    })
  },

  methods: {
    handleDisplayCount () {
      if (this.isMobile) {
        this.theDisplayCount = this.totalLinksCount
      } else {
        window.addEventListener('scroll', this.handleScroll)
      }
    },

    handleScroll () {
      if (window.scrollY >= 188 && window.scrollY <= 999) {
        this.theDisplayCount = this.totalLinksCount
      }
    },

    /* -----------------------on***Event----------------------- */
    onCountUpCallback: (ins) => {
      // ins.update(ins.endVal + 100)
    }
  },

  locales: {
    en: {
      countupText: 'The number of high quality websites has been included'
    },
    zh: {
      countupText: '已经收录优质网站个数'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import './../../assets/scss/mixins.scss';

.countup-area{
  .countup-number{
    display: block;
    margin-top: 10px;
  }
  color: $black;
  width: 100%;
  height: $section-height;
  @include flex-box-center(column);
  background: #f4f6fa;
  background: -webkit-linear-gradient(to top, #f4f6fa, #eef2f3);
  background: linear-gradient(to top, #f4f6fa, #eef2f3);
}
</style>

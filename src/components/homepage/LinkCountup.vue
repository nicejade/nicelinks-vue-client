<template>
  <div class="countup-area">
    <div class="top-crescent" v-if="!$isMobile"></div>
    <h2 class="countup-title medium-font">已经收录优质网站个数</h2>
    <CountUp
      id="countup-number"
      class="countup-number"
      :start="0"
      :end="theDisplayCount"
      :decimals="0"
      :duration="2.5"
      :options="countUpoptions"
      @callback="onCountUpCallback"
    >
    </CountUp>
  </div>
</template>

<script>
import CountUp from 'components/CountUp'
import { isElementInViewport } from './../../helper/tool'

export default {
  name: 'LinkCountup',

  data() {
    return {
      theDisplayCount: 0,
      totalLinksCount: 0,
      countUpoptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
      },
    }
  },

  components: {
    CountUp,
  },

  created() {
    let params = { active: true }
    this.$apis
      .getAllLinksCount(params)
      .then((result) => {
        this.totalLinksCount = result
        this.handleDisplayCount()
      })
      .catch((error) => {
        this.totalLinksCount = 99
        this.handleDisplayCount()
        console.log(error)
      })
  },

  methods: {
    handleDisplayCount() {
      const countupNumberNode = document.getElementById('countup-number')
      const handleScrollEvent = (element) => {
        const isInViewport = isElementInViewport(countupNumberNode)
        if (isInViewport) {
          this.theDisplayCount = this.totalLinksCount
        }
      }
      window.addEventListener('scroll', handleScrollEvent)
    },

    /* -----------------------on***Event----------------------- */
    onCountUpCallback: (ins) => {
      // ins.update(ins.endVal + 100)
    },
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.countup-area {
  position: relative;
  width: 100%;
  height: $section-height;
  @include flex-box-center(column);
  color: $black;
  background: $white-grey;
  background: -webkit-linear-gradient(to top, $white-grey, #eef2f3);
  background: linear-gradient(to top, $white-grey, #eef2f3);

  .top-crescent {
    position: absolute;
    top: -$crescent-height / 2;
    width: 100%;
    height: $crescent-height;
    clip-path: ellipse(64% 50% at 50% 50%);
    background-color: $white;
  }

  .countup-title {
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(-70deg, #9867f0, #ed4e50);
    -webkit-background-clip: text;
  }

  .countup-number {
    display: block;
    margin-top: 10px;
  }
}
</style>

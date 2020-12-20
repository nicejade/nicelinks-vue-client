<template>
  <div class="redirect-wrapper">
    <div class="balls">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p class="redirect-tip">倾城之链：倾心缔造，痴心为你</p>
  </div>
</template>

<script>
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'Redirect',

  data() {
    return {}
  },

  mixins: [metaMixin],

  created() {},

  metaInfo() {
    return {
      title: `倾城跳转 - ${this.$t('niceLinksStr')}`,
      meta: [
        { name: 'keywords', content: this.$t('keywords') },
        { name: 'description', content: this.$t('description') },
      ],
    }
  },

  mounted() {
    const paramObj = this.$util.query(window.location.href)
    const targetUrl = window.decodeURIComponent(paramObj.url)
    window.location.href = `${targetUrl}?utm_source=nicelinks.site`
  },

  watch: {},

  components: {},

  methods: {},
}
</script>

<style lang="scss">
.redirect-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.redirect-tip {
  margin-top: 30px;
}
.balls {
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #7a8ba9;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>

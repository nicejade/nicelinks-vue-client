<template>
  <div class="redirect-wrapper">
    <div class="jump-to-area" :style="websiteBgStyle">
      <div class="card">
        <h2 class="title">即将从<a href="http://nicelinks.site?ref=redirect">倾城之链</a>跳转到</h2>
        <div class="link-box">
          <span class="link-url">{{ targetWebsite }}</span>
        </div>
        <button class="continue-btn gtag-track" @click="onContinueClick">
          <span class="continue-go">继续前往</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import metaMixin from 'mixins/metaMixin.js'
import pageMixin from 'mixins/pageMixin.js'

export default {
  name: 'Redirect',

  data() {
    return {
      targetWebsite: '',
      websiteDomain: '',
      isAutoRedirect: false,
    }
  },

  mixins: [metaMixin, pageMixin],

  components: {},

  created() {},

  computed: {
    websiteBgStyle() {
      return {
        'background-image': `url(https://oss.nicelinks.site/${this.websiteDomain}.png?x-oss-process=style/png2jpg)`,
      }
    },
  },

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
    this.isAutoRedirect = this.$util.getUrlParam('isauto')
    const paramObj = this.$util.query(window.location.href)
    this.targetWebsite = window.decodeURIComponent(paramObj.url)
    this.websiteDomain = new URL(this.targetWebsite).hostname
    if (this.isAutoRedirect) {
      this.jumpToTargetWebsite()
    }
  },

  watch: {},

  components: {},

  methods: {
    jumpToTargetWebsite() {
      const paramObj = this.$util.query(window.location.href)
      const targetUrl = window.decodeURIComponent(paramObj.url)
      window.location.href = `${targetUrl}?utm_source=nicelinks.site`
    },

    onContinueClick() {
      this.$gtagTracking('redirect-btn', 'redirect', 'redirect-btn')
      this.jumpToTargetWebsite()
    },
  },
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

.jump-to-area {
  width: 640px;
  height: 360px;
  padding: 30px 60px;
  background-color: #f7f8f9;
  box-shadow: 0 8px 32px 0 #454545;
  background-position: center;
  background-size: 100%;
  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: hsla(0, 0%, 100%, 0.38);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    .title {
      font-weight: 500;
      margin: 15px 0;
    }
    .link-box {
      width: 360px;
      height: 36px;
      background: #f4f4f4;
      border-radius: 3px;
      border: 1px solid #dcdce0;
      margin: 15px 0;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .link-url {
        color: #5a6d96;
        display: block;
        line-height: 36px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 32px;
      }
    }
    .continue-btn {
      width: 150px;
      height: 40px;
      margin: 15px 0;
      border-radius: 20px;
      background: #20a0ff;
      border: none;
      background-image: -webkit-linear-gradient(45deg, #20a0ff 38%, #b0c9ff 100%);
      background-image: linear-gradient(45deg, #20a0ff 38%, #b0c9ff 100%);
      transition: 0.4s;
      color: #fff;
      cursor: pointer;
      .continue-go {
        font-size: 18px;
        background-image: linear-gradient(to right, #ffeb3b, #fff);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
    }
    .continue-btn:hover {
      background-image: -webkit-linear-gradient(45deg, #20a0ff 80%, #b0c9ff 100%);
      background-image: linear-gradient(45deg, #20a0ff 80%, #b0c9ff 100%);
    }
  }
}

@media (min-width: 1560px) {
  .jump-to-area {
    width: 1280px;
    height: 720px;
    padding: 60px 120px;
    .card {
      .link-box {
        width: 360px;
      }
    }
  }
}

@media (max-width: 768px) {
  .jump-to-area {
    width: 356px;
    height: 200px;
    padding: 15px 30px;
    .card {
      .link-box {
        width: 280px;
      }
      .continue-btn {
        width: 120px;
        height: 32px;
        border-radius: 16px;
        .continue-go {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="redirect-wrapper">
    <h1 class="jump-title">
      <img class="logo" src="/static/img/favicons/safari-pinned-tab.svg" :alt="$t('niceLinksStr')" />
      <a rel="home" class="title-link" @click="onReportEvent('h1-title-link')"
        href="http://nicelinks.site?ref=redirect">倾城之链</a>
    </h1>
    <div class="jump-to-area" :style="websiteBgStyle">
      <div class="card">
        <h2 class="title">
          即将从<a rel="home" @click="onReportEvent('nice-link')" href="http://nicelinks.site?ref=redirect">倾城之链</a>跳转到
        </h2>
        <div class="link-box">
          <p class="link-url">{{ targetWebsite }}</p>
        </div>
        <a class="redirect-btn effect-btn" @click="onReportEvent('redirect-btn')"
          :rel="isalive ? 'noopener' : 'noopener nofollow'" :href="targetPath">
          <span class="jump-to">前往该网站</span>
        </a>
      </div>
    </div>
    <p v-if="!isalive" class="visit-reminder">
      <string class="reminder">*温馨提示</string>：据「倾城观察员」探测，该网站已不能正常访问，望客观知悉。
    </p>
  </div>
</template>

<script>
import { NICE_LINKS } from 'config/constant'
import { queryUrl2Obj } from './../helper/tool'

export default {
  name: 'Redirect',

  data() {
    return {
      targetWebsite: '',
      targetPath: '',
      websiteDomain: '',
      isalive: true,
      isAutoRedirect: false,
    }
  },

  created() {
    this.$gtagTracking('visite', 'redirect')
  },

  computed: {
    websiteBgStyle() {
      return {
        'background-image': `url(https://oss.nicelinks.site/${this.websiteDomain}.png?x-oss-process=style/png2jpg)`,
      }
    },
  },

  mounted() {
    this.$setPageTitle('重定向')

    const paramObj = queryUrl2Obj(window.location.href)
    this.targetWebsite = window.decodeURIComponent(paramObj.url || NICE_LINKS)
    this.websiteDomain = new URL(this.targetWebsite).hostname
    this.isAutoRedirect = paramObj.isauto
    this.isalive = !(paramObj.alive && paramObj.alive === '0')
    this.targetPath = `${this.targetWebsite}?utm_source=nicelinks.site`
    if (this.isAutoRedirect) {
      this.$gtagTracking('auto-jump', 'redirect')
      window.location.href = this.targetPath
    }
  },

  methods: {
    onReportEvent(action) {
      this.$gtagTracking(action, 'redirect')
    }
  },
}
</script>

<style lang="scss" scoped>
$color: #272755;
$primary: #ea552d;

.redirect-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .jump-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    margin: 1rem 0;
    height: 4rem;

    .logo {
      width: 4rem;
      margin-right: 1rem;
    }

    .title-link {
      font-size: 2.4rem;
      color: #454545;
    }
  }
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
      text-align: center;
    }

    .link-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 360px;
      height: 36px;
      background: #f4f4f4;
      border-radius: 3px;
      border: 1px solid #dcdce0;
      margin: 15px 0;

      .link-url {
        display: block;
        height: 3rem;
        line-height: 3rem;
        color: #5a6d96;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .redirect-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 56px;
      font-size: 1.8rem;
      line-height: 2em;
      margin: 15px 0;
      border-radius: 28px;
      border: none;
    }

    .effect-btn {
      border: 2px solid #ea552d;
      color: #ea552d;
      font-weight: bold;
      transition: all 0.2s ease;
      box-sizing: border-box;

      &:hover {
        color: #ffffff;
        background-color: #ea552d;
      }
    }
  }
}

.visit-reminder {
  color: #9393aa;
  margin: 2rem auto;

  .reminder {
    font-weight: 600;
    color: #ea552d;
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
    }
  }
}
</style>

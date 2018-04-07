<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <side-nav v-if="isMobile"></side-nav>
    <main @click="hideMenu" class="main">
      <router-view  :key="$route.path"></router-view>
    </main>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import HeaderNav from 'partials/HeaderNav'
import SideNav from 'partials/SideNav'
import FooterNav from 'partials/FooterNav'

export default {
  name: 'Frame',
  data () {
    return {
      isMobile: window.innerWidth <= 960,
      isShowDlgFlag: false
    }
  },

  components: {
    HeaderNav,
    SideNav,
    FooterNav
  },

  created () {
    this.$bus.on('trigger-sidenav', () => {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
    })

    if (!this.$auth.checkSession()) {
      this.$vuexSetUserInfo({})
    } else {
      if (!this.$util.getSessionStorage('userInfo')) {
        this.$getUserInfo()
      }
    }

    // Temporarily shut down the WeChat sharing function@04-07
    // this.initWechatShare()
  },

  mounted () {
  },

  watch: {
    $route: function (to, from) {
      // this.initWechatShare()
    }
  },

  methods: {
    hideMenu () {
      if (this.isShowSideNav) {
        this.$bus.$emit('trigger-sidenav')
      }
    },

    initWechatShare () {
      const params = {
        url: encodeURIComponent(location.href.split('#')[0])
      }
      this.$apis.getWechatApiSignature(params).then(result => {
        this.initWechatConfig(result)
      })
    },

    initWechatConfig (result) {
      const wechatJs = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
      this.$util.loadScript(wechatJs).then(() => {
        window.wx.config({
          appId: result.appId,
          timestamp: result.timestamp,
          nonceStr: result.nonceStr,
          signature: result.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        })

        window.wx.ready(() => {
          this.setWechatShare()
        })

        window.wx.error((res) => {
        })
      })
    },

    setWechatShare () {
      if (!window.wx) return

      const shareTitle = window.document.title
      const shareLink = window.document.location.href
      const shareImgUrl = 'https://nicelinks.site/static/img/favicons/android-chrome-192x192.png'
      window.wx.onMenuShareTimeline({
        title: shareTitle,
        link: shareLink,
        imgUrl: shareImgUrl,
        success: function () {
        },
        cancel: function () {
        },
        fail: function (message) {
          window.alert(`Error: ${message}`)
        }
      })

      window.wx.onMenuShareAppMessage({
        title: shareTitle,
        desc: this.$t('description'),
        link: shareLink,
        imgUrl: shareImgUrl,
        type: 'link',
        dataUrl: '',
        success: function () {
        },
        cancel: function () {
        },
        fail: function (message) {
          window.alert(`Error: ${message}`)
        }
      })
    }
  }
}
</script>

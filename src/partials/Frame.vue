<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <side-nav v-if="isMobile"></side-nav>
    <main @click="hideMenu" class="main">
      <router-view :key="$route.path"></router-view>
    </main>
    <footer-nav />
    <elevator v-if="!isMobile" />
    <auto-dialog v-if="isShowAutoDlgFlag" @close="onHandleClose" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import HeaderNav from 'partials/HeaderNav'
import SideNav from 'partials/SideNav'
import FooterNav from 'partials/FooterNav'
import Elevator from 'components/Elevator'
import AutoDialog from 'components/AutoDialog'

import { AUTO_DIALOG } from 'config/constant'

export default {
  name: 'Frame',
  data() {
    return {
      isMobile: window.innerWidth <= 960,
      isShowDlgFlag: false,
      isShowAutoDlgFlag: false,
    }
  },

  components: {
    HeaderNav,
    SideNav,
    FooterNav,
    Elevator,
    AutoDialog,
  },

  created() {
    if (!this.$auth.checkSession()) {
      this.$vuexSetUserInfo({})
    } else {
      if (!this.$util.getSessionStorage('userInfo')) {
        this.$getUserInfo()
      }
    }
    const isHadDisplay = this.$util.getLocalStorage(AUTO_DIALOG)
    this.isShowAutoDlgFlag = !this.isMobile && !isHadDisplay
    if (this.isShowAutoDlgFlag) {
      this.$gtagTracking('auto-dialog', 'global', 'auto-dialog')
    }
    // Temporarily shut down the WeChat sharing function@04-07
    // this.initWechatShare()
  },

  mounted() {},

  watch: {
    $route: function (to, from) {
      // this.initWechatShare()
    },
  },

  methods: {
    ...mapMutations(['$setIsLoadRouterInlineJs']),

    hideMenu() {
      if (this.isShowSideNav) {
        this.$triggerSidenav()
      }
    },

    onHandleClose() {
      this.isShowAutoDlgFlag = false
      this.$gtagTracking('close-auto-dialog', 'global', 'close-auto-dialog')
    },

    initWechatShare() {
      const params = {
        url: encodeURIComponent(location.href.split('#')[0]),
      }
      this.$apis.getWechatApiSignature(params).then((result) => {
        this.initWechatConfig(result)
      })
    },

    initWechatConfig(result) {
      const wechatJs = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
      this.$util.loadScript(wechatJs).then(() => {
        window.wx.config({
          appId: result.appId,
          timestamp: result.timestamp,
          nonceStr: result.nonceStr,
          signature: result.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        })

        window.wx.ready(() => {
          this.setWechatShare()
        })

        window.wx.error((res) => {})
      })
    },

    setWechatShare() {
      if (!window.wx) return

      const shareTitle = window.document.title
      const shareLink = window.document.location.href
      const shareImgUrl = 'https://nicelinks.site/static/img/favicons/android-chrome-192x192.png'
      window.wx.onMenuShareTimeline({
        title: shareTitle,
        link: shareLink,
        imgUrl: shareImgUrl,
        success: function () {},
        cancel: function () {},
        fail: function (message) {
          window.alert(`Error: ${message}`)
        },
      })

      window.wx.onMenuShareAppMessage({
        title: shareTitle,
        desc: this.$t('description'),
        link: shareLink,
        imgUrl: shareImgUrl,
        type: 'link',
        dataUrl: '',
        success: function () {},
        cancel: function () {},
        fail: function (message) {
          window.alert(`Error: ${message}`)
        },
      })
    },
  },
}
</script>

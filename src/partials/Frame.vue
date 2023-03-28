<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <side-nav v-if="$isMobile"></side-nav>
    <main @click="onHideMenuClick" class="main">
      <router-view :key="$route.path"></router-view>
    </main>
    <footer-nav />
    <elevator v-if="!$isMobile" />
    <auto-dialog v-if="isShowAutoDlgFlag" @close="onHandleClose" />
    <ad-block-dialog v-if="isInstallAdBlock" @close="onHandleAdBlockClose" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import HeaderNav from 'partials/HeaderNav'
import SideNav from 'partials/SideNav'
import FooterNav from 'partials/FooterNav'
import Elevator from 'components/Elevator'
import AutoDialog from 'components/dialog/AutoDialog'
import AdBlockDialog from 'components/dialog/AdBlockDialog'
import { AUTO_DIALOG } from 'config/constant'
import $auth from './../helper/auth'
import { getSessionStorage, getLocalStorage } from './../helper/tool'

export default {
  name: 'Frame',

  data() {
    return {
      adsboxElemNode: null,
      isShowAutoDlgFlag: false,
      isInstallAdBlock: false,
    }
  },

  components: {
    HeaderNav,
    SideNav,
    FooterNav,
    Elevator,
    AutoDialog,
    AdBlockDialog,
  },

  created() {
    if (!$auth.checkSession()) {
      this.$vuexSetUserInfo({})
    } else {
      if (!getSessionStorage('userInfo')) {
        this.$getUserInfo()
      }
    }
    const isHadDisplay = getLocalStorage(AUTO_DIALOG)
    this.isShowAutoDlgFlag = !this.$isMobile && !isHadDisplay
    if (this.isShowAutoDlgFlag) {
      this.$gtagTracking('auto-dialog', 'global')
    }
    // Temporarily shut down the WeChat sharing function@04-07
    // this.initWechatShare()
  },

  mounted() {
    this.runAdsChecker()
  },

  /*
  watch: {
    $route: function (to, from) {
      this.initWechatShare()
    },
  },
  */

  methods: {
    ...mapMutations(['$setIsLoadRouterInlineJs']),

    runAdsChecker() {
      if (this.$isMobile || this.isShowAutoDlgFlag) return

      this.adsboxElemNode = document.createElement('div')
      this.adsboxElemNode.className = 'adsbox google-ad'
      this.adsboxElemNode.style.height = "1px"
      document.body.appendChild(this.adsboxElemNode)
      const adsboxCssStyle = getComputedStyle(this.adsboxElemNode)
      this.isInstallAdBlock = 'none' === adsboxCssStyle.display || adsboxCssStyle.height === '0px'
      if (this.isInstallAdBlock) {
        this.$gtagTracking('ad-block-dialog', 'global')
      }
    },

    onHideMenuClick() {
      if (this.isShowSideNav) {
        this.$triggerSidenav()
      }
    },

    onHandleClose() {
      this.isShowAutoDlgFlag = false
      this.$gtagTracking('close-auto-dialog', 'global')

      setTimeout(() => {
        this.runAdsChecker() // Open Ads Dlg When Close AutoDialog 22.07.02
      }, 2100)
    },

    onHandleAdBlockClose() {
      this.$gtagTracking('close-ad-block-dialog', 'global')
      this.isInstallAdBlock = false
      document.body.removeChild(this.adsboxElemNode)
      this.adsboxElemNode = null
    },

    /*
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
    */
  },
}
</script>

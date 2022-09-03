import Vue from 'vue'
import $auth from './../helper/auth'
import { mapActions, mapMutations } from 'vuex'
import { isLegalUrl } from './../helper/tool'

Vue.mixin({
  data() {
    return {}
  },

  computed: {
    // Element-UI this.$confirm/this.$msgbox 等会激发 this.$store 为 undefined;
    // 导致报错如下：Cannot read property 'state' of undefined;所以如下 hack 处理如下;
    // ...mapState([
    //   'userInfo'
    // ])
    userInfo() {
      return (this.$store && this.$store.state.userInfo) || null
    },
  },

  methods: {
    ...mapActions(['$getUserInfo']),

    ...mapMutations(['$vuexSetUserInfo', '$vuexSaveLastPathUrl', '$vuexRecoverRequestParamList']),

    $isLogin() {
      return $auth.checkSession()
    },

    $switchRouteByExplore(name = '') {
      if (!name) {
        return
      }
      this.$router.push(`/explore/${name}`)
    },

    $switchRouteByTheme(theme = '') {
      if (!theme) {
        return
      }
      this.$router.push(`/theme/${theme.toLocaleLowerCase()}`)
    },

    $triggerSidenav() {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
    },

    $switchToLogin() {
      this.$vuexSaveLastPathUrl()
      this.$router.push('/login')
    },

    $switchToExploreAll() {
      this.$vuexRecoverRequestParamList()
      this.$router.push('/explore/all')
    },

    $switchToShareLink() {
      if (this.$isLogin()) {
        this.$router.push('/share-link')
      } else {
        this.$switchToLogin()
      }
    },

    $verifyUrl(rule, value, callback) {
      if (!value || value.length <= 0) {
        callback(new Error(this.$t('pleaseEnter') + this.$t('linkAddressStr')))
      }
      if (!isLegalUrl(value)) {
        callback(new Error(this.$t('enterLegalUrl')))
      } else {
        callback()
      }
    },

    /*
      Desc: 使用 gtag.js 进行事件跟踪(仅通过 JS);
      Date: 2018-03-04
    */
    $gtagTracking(action, category, label = '') {
      const gtag = window.gtag || (() => { })
      gtag('event', action, {
        event_category: category,
        event_label: label || action,
      })
    },
  },
})

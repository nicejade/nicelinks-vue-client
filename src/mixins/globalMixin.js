import Vue from 'vue'
import Cookies from 'js-cookie'
import { $util } from 'helper'
import {mapActions} from 'vuex'

Vue.mixin({
  data () {
    return {
    }
  },

  computed: {
    // Element-UI this.$confirm/this.$msgbox 等会激发 this.$store 为 undefined;
    // 导致报错如下：Cannot read property 'state' of undefined;所以如下 hack 处理如下;
    // ...mapState([
    //   'userInfo'
    // ])
    userInfo () {
      return this.$store && this.$store.state.userInfo || null
    }
  },

  methods: {
    ...mapActions([
      '$getUserInfo'
    ]),

    $isLogin () {
      return this.$auth.checkSession()
    },

    $getCurrentLang () {
      return Vue.config.lang || 'zh'
    },

    $switchLang () {
      let currentLang = Vue.config.lang === 'zh' ? 'en' : 'zh'
      Vue.config.lang = currentLang
      Cookies.set('lang', currentLang)
    },

    $switchRouteByExplore (name = '') {
      if (!name) { return }
      this.$router.push(`/explore/${name}`)
    },

    $switchRouteByTheme (theme = '') {
      if (!theme) { return }
      this.$router.push(`/theme/${theme.toLocaleLowerCase()}`)
    },

    $switchToShareLink () {
      if (this.$isLogin()) {
        this.$router.push('/share-link')
      } else {
        this.$router.push('/login')
      }
    },

    $verifyUrl (rule, value, callback) {
      if (!value || value.length <= 0) {
        callback(new Error(this.$t('pleaseEnter') + this.$t('linkAddressStr')))
      } if (!$util.isLegalUrl(value)) {
        callback(new Error(this.$t('enterLegalUrl')))
      } else {
        callback()
      }
    }
  }
})

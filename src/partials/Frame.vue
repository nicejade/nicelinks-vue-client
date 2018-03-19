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
      this.$store.commit('$vuexSetUserInfo', {})
    } else {
      if (!this.$util.getSessionStorage('userInfo')) {
        this.$getUserInfo()
      }
    }
  },

  methods: {
    hideMenu () {
      if (this.isShowSideNav) {
        this.$bus.$emit('trigger-sidenav')
      }
    },

    afterEnter (element) {
      element.style.height = 'calc(100% - 60px)'
    },

    afterLeave (element) {
    }
  }
}
</script>

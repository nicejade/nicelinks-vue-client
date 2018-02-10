<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <transition name="slide"
      v-on:after-enter="afterEnter"
      v-on:after-leave="afterLeave"
    >
      <side-nav ref="sideNav" v-if="isMobile && isShowSideNav"></side-nav>
    </transition>
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
      isShowSideNav: false,
      isShowDlgFlag: false
    }
  },

  components: {
    HeaderNav,
    SideNav,
    FooterNav
  },

  created () {
    this.$bus.on('trigger-sidenav', (isHide = false) => {
      this.isShowSideNav = !isHide && !this.isShowSideNav

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

<style lang="scss">
@import "../assets/scss/variables.scss";
.slide-enter,
.slide-leave-to{
  background-color: #ffffff;
  height: 0;
}
.slide-enter-active{
  transition: background 0.38s linear,height 0.38s ease-in 200ms
}
.slide-leave-active{
  background-color: #ffffff;
  transition: background 0.21s linear,height 0.21s ease-in 200ms
}
.slide-enter-to,
.slide-leave{
  background-color: #ffffff;
  height: calc(100% - 60px);
}
</style>

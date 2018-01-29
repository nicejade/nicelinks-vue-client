<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <transition name="slide">
      <side-nav ref="sideNav" v-if="isMobile" v-show="isShowSideNav"></side-nav>
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
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.slide-enter{
  left: -210px;
}
.slide-enter-active{
  transition: left 200ms cubic-bezier(0.125, 0.565, 0.860, 0.310);
  transition-timing-function: cubic-bezier(0.125, 0.565, 0.860, 0.310);
}
.slide-enter-to{
  left: 0px;
}
.slide-leave{
  left: 0px;
}
.slide-leave-active{
  transition: left .1s
}
.slide-leave-to{
  left: -210px;
}
</style>

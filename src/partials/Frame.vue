<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <side-nav ref="sideNav" v-if="isMobile" v-show="isShowSideNav"></side-nav>
    <main @click="hideMenu" class="main">
      <!-- <transition name="fade"></transition> -->
      <router-view  :key="$route.path"></router-view>
    </main>
  </div>
</template>

<script>
import HeaderNav from 'partials/HeaderNav'
import SideNav from 'partials/SideNav'
import { $apis } from 'helper'
import _ from 'lodash'

export default {
  name: 'homepage',
  data () {
    return {
      title: 'Nice Links',
      isMobile: window.innerWidth <= 960,
      isShowSideNav: false,
      userInfo: {}
    }
  },

  components: {
    HeaderNav,
    SideNav
  },

  created () {
    this.$bus.on('trigger-sidenav', () => {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
      this.isShowSideNav = !this.isShowSideNav
    })

    this.$bus.on('setProfile', (params) => {
      return new Promise((resolve, reject) => {
        $apis.setProfile(params).then(result => {
          resolve(result)
        }).catch(e => {
          resolve(e)
        })
      })
    })

    this.$bus.on('getProfile', (params) => {
      if (_.isEmpty(this.userInfo)) {
        return new Promise((resolve, reject) => {
          $apis.getProfile().then(result => {
            this.userInfo = result
            resolve(result)
          }).catch(e => {
            resolve(e)
          })
        })
      } else {
        return this.userInfo
      }
    })
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
</style>

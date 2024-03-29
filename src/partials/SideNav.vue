<template>
  <div class="side-nav">
    <el-menu :default-openeds="[]" default-active="1" :unique-opened="true" @open="handleOpen" @close="handleClose"
      theme="light">
      <el-submenu index="1">
        <template slot="title">
          <i class="sidenav-icon el-icon-menu"></i>{{ $t('niceLinksStr') }}
        </template>
        <el-menu-item v-for="(item, index) in navList" :key="item.value" @click="handleClick(item)" :index="item.name">
          {{ $t(item.name) }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2" @click="onShareNewLinkClick">
        <i class="sidenav-icon el-icon-plus"></i>{{ $t('shareNewLink') }}
      </el-menu-item>
      <el-menu-item index="3" @click="onThemeClick">
        <icon class="sidenav-icon" name="theme"></icon>{{ $t('themeCollection') }}
      </el-menu-item>
      <el-menu-item index="4" @click="onTagsClick">
        <icon class="sidenav-icon" name="tag"></icon>{{ $t('tagsCollection') }}
      </el-menu-item>
      <el-menu-item index="5" @click="onOfficialRecommendClick">
        <icon class="sidenav-icon" name="heart"></icon>{{ $t('officialRecommend') }}
      </el-menu-item>
      <el-menu-item index="6" @click="onRecommendClick">
        <icon class="sidenav-icon" name="likes"></icon>{{ $t('RecommendGoodWebsite') }}
      </el-menu-item>
      <el-menu-item index="7" @click="onProductCemeteryClick">
        <icon class="sidenav-icon" name="product-cemetery"></icon>{{ $t('productCemetery') }}
      </el-menu-item>
      <el-menu-item index="8" @click="onJump2WebsiteClick">
        <icon class="sidenav-icon" name="about-website"></icon>{{ $t('aboutWebsite') }}
      </el-menu-item>
      <el-menu-item index="9" @click="onJump2AuthorClick">
        <icon class="sidenav-icon" name="about-author"></icon>{{ $t('aboutAuthor') }}
      </el-menu-item>
      <el-submenu index="10" v-if="isAdminFlag">
        <template slot="title">
          <i class="sidenav-icon el-icon-setting"></i>{{ $t('management') }}
        </template>
        <el-menu-item v-for="(item, index) in $util.getManageList()" :key="index" @click="handleManageClick(item)"
          :index="item.path">
          {{ $t(item.name) }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import { Menu, Submenu, MenuItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/menu.css'
import 'element-ui/lib/theme-chalk/submenu.css'
import 'element-ui/lib/theme-chalk/menu-item.css'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

import classify from 'config/classify'
import { REPORT_PATH } from 'config/constant'
import { openAuthorSite } from './../helper/tool'

export default {
  name: 'SideNav',

  data() {
    return {
      navList: Object.freeze(classify),
    }
  },

  computed: {
    isAdminFlag() {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    },
  },

  methods: {
    onShareNewLinkClick() {
      this.triggerSideNav()
      this.$switchToShareLink()
      this.$gtagTracking('share-new-link', 'sidebar', 'm-share-new-link')
    },

    onThemeClick() {
      this.$router.push('/collections/theme')
      this.triggerSideNav()
      this.$gtagTracking('theme-collection', 'sidebar', 'm-theme-collection')
    },

    onTagsClick() {
      this.$router.push('/collections/tags')
      this.triggerSideNav()
      this.$gtagTracking('tags-collection', 'sidebar', 'm-tags-collection')
    },

    onProductCemeteryClick() {
      this.$router.push('/cemetery')
      this.triggerSideNav()
      this.$gtagTracking('cemetery', 'sidebar', 'm-cemetery')
    },

    onOfficialRecommendClick() {
      this.$gtagTracking('official-recommend', 'sidebar')
      this.$router.push('/recommend')
    },

    onRecommendClick() {
      this.$gtagTracking('recommend-website', 'sidebar', 'm-recommend')
      this.triggerSideNav()
      window.open(REPORT_PATH)
    },

    onManageClick() {
      this.$router.push('/manage')
      this.triggerSideNav()
    },

    onJump2WebsiteClick() {
      this.triggerSideNav()
      const websitePath = 'https://nicelinks.site/about?utm_source=nicelinks.site'
      window.open(websitePath)
    },

    onJump2AuthorClick() {
      this.triggerSideNav()
      openAuthorSite('sidebar')
    },

    handleClick(item) {
      this.$gtagTracking(`explore-${item.name}`, 'sidebar', `m-explore-${item.name}`)
      this.$switchRouteByExplore(item.name)
      this.triggerSideNav()
    },

    handleManageClick(item) {
      this.$router.push(`/manage/${item.path}`)
      this.triggerSideNav()
    },

    triggerSideNav() {
      this.$gtagTracking('trigger-sidenav', 'sidebar', 'm-trigger-sidenav')
      this.$triggerSidenav()
    },

    handleOpen() { },

    handleClose() { },
  },
}
</script>

<style media="screen" lang="scss">
@import './../assets/scss/variables.scss';

.menu-expand .side-nav {
  height: 100%;
}

.side-nav {
  position: fixed;
  top: $header-mobile-height;
  width: $side-nav-width;
  height: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: $white;
  text-align: left;
  z-index: $zindex-side-nav;
  transition: background-color 0.5s ease;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0px;
  }

  &:hover::-webkit-scrollbar {
    background-color: transparent;
    width: 0px;
  }

  .el-menu-item {
    display: flex;
    align-items: center;
  }

  .sidenav-icon {
    width: 16px;
    height: 16px;
    margin: 1rem;
    color: #130c0e;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    display: block;
    width: calc(100vw - 100%);
    height: 100%;
  }

  .side-nav-close {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    color: $black;
  }

  .nicelinks-logo {
    margin: 2rem 0 0 0;
  }
}
</style>

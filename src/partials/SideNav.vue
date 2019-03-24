<template>
<div class="side-nav">
  <el-menu :default-openeds="[]" default-active="1" :unique-opened="true"
    @open="handleOpen" @close="handleClose" theme="light">
    <el-submenu index="1">
      <template slot="title">
        <i class="sidenav-icon el-icon-menu"></i>{{ $t('niceLinksStr') }}
      </template>
      <el-menu-item v-for="(item, index) in navList"
        :key="item.value" @click="handleClick(item)" :index="item.name">
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
    <el-menu-item index="5" @click="onSwitchLangClick">
      <icon class="sidenav-icon" name="switch-lang"></icon>{{ $t('switchLang') }}
    </el-menu-item>
    <el-menu-item index="6" @click="onJump2WebsiteClick">
      <icon class="sidenav-icon" name="about-website"></icon>{{ $t('aboutWebsite') }}
    </el-menu-item>
    <el-menu-item index="6" @click="onJump2AuthorClick">
      <icon class="sidenav-icon" name="about-author"></icon>{{ $t('aboutAuthor') }}
    </el-menu-item>
    <el-submenu index="7" v-if="isAdminFlag">
      <template slot="title">
        <i class="sidenav-icon el-icon-setting"></i>{{ $t('management') }}
      </template>
      <el-menu-item v-for="(item, index) in $util.getManageList()" :key="index"
        @click="handleManageClick(item)" :index="item.path">
        {{ $t(item.name) }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
import $config from 'config'

export default {
  name: 'SideNav',
  data () {
    return {
      navList: $config.classify
    }
  },

  components: {
  },

  computed: {
    isAdminFlag () {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    }
  },

  mounted () {
  },

  methods: {
    onShareNewLinkClick () {
      this.triggerSideNav()
      this.$switchToShareLink()
      this.$gtagTracking('share-new-link', 'sidebar', 'm-share-new-link')
    },

    onThemeClick () {
      this.$router.push('/collections/theme')
      this.triggerSideNav()
      this.$gtagTracking('theme-collection', 'sidebar', 'm-theme-collection')
    },

    onTagsClick () {
      this.$router.push('/collections/tags')
      this.triggerSideNav()
      this.$gtagTracking('tags-collection', 'sidebar', 'm-tags-collection')
    },

    onSwitchLangClick () {
      this.$switchLang()
      this.triggerSideNav()
      this.$gtagTracking('switch-lang', 'sidebar', 'm-switch-lang')
    },

    onManageClick () {
      this.$router.push('/manage')
      this.triggerSideNav()
    },

    onJump2WebsiteClick () {
      this.triggerSideNav()
      const websitePath = `https://nice.lovejade.cn/${this.$getCurrentLang()}/application/`
      window.open(websitePath)
    },

    onJump2AuthorClick () {
      this.triggerSideNav()
      this.$util.openAuthorSite('sidebar')
    },

    handleClick (item) {
      this.$gtagTracking(`explore-${item.name}`, 'sidebar', `m-explore-${item.name}`)
      this.$switchRouteByExplore(item.name)
      this.triggerSideNav()
    },

    handleManageClick (item) {
      this.$router.push(`/manage/${item.path}`)
      this.triggerSideNav()
    },

    triggerSideNav () {
      this.$gtagTracking('trigger-sidenav', 'sidebar', 'm-trigger-sidenav')
      this.$triggerSidenav()
    },

    handleOpen (index) {
    },

    handleClose () {
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
  .menu-expand .side-nav{
    height: 100%;
  }
  .side-nav{
    position: fixed;
    top: $header-mobile-height;
    width: $side-nav-width;
    height: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: $white;
    text-align: left;
    z-index: $zindex-side-nav;
    transition: all .5s ease;
    &::-webkit-scrollbar {
      background: transparent;
      width: 0px;
    }
    &:hover::-webkit-scrollbar {
      background: transparent;
      width: 0px;
    }
    .el-menu-item{
      display: flex;
      align-items: center;
    }
    .sidenav-icon{
      width: 16px;
      height: 16px;
      margin-right: 10px;
      color: #130c0e;
    }
    &:after{
      content: "";
      position: absolute;
      top: 0;
      left: 100%;
      display: block;
      width: calc(100vw - 100%);
      height: 100%;
    }
    .side-nav-close{
      position: absolute;
      top: 1.2rem;
      left: 1.2rem;
      color: $black;
    }
    .nicelinks-logo{
      margin: 2rem 0 0 0;
    }
  }
</style>

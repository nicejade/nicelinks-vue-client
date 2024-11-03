<template>
  <header class="header blur-effect">
    <nav class="nav">
      <div class="header-logo">
        <a href="/" rel="home" class="header-logo-a nicelinks-logo" @click="onHomeClick">
          <img src="/static/img/favicons/safari-pinned-tab.svg" :alt="$t('niceLinksStr')" />
          <h1 class="title">{{ $t('niceLinksStr') }}</h1>
        </a>
      </div>

      <a href="javascript:;" class="menu" @click="onToggleMenuClick">
        <span></span>
      </a>

      <div class="operate-area">
        <router-link @click.native="onExploreClick(item)" v-for="item in navList" :key="item.value"
          :to="'/explore/' + item.name" :class="makeClassName(item.name)">
          {{ $t(item.name) }}
        </router-link>
      </div>

      <div class="share-btn" @mouseenter="onShareBtnMouseover" @mouseout="onShareBtnMouseout">
        <router-link to="/share-link" class="share-link" @click.native="onShareClick">
          <span class="gradient-text">🕊 {{ $t('shareNewLink') }}</span>
        </router-link>
      </div>

      <div class="find-more">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            {{ $t('findMore') }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="find-more-dropdown-menu">
            <el-dropdown-item command="ThemeCollection">
              <icon class="vector-icon" name="theme"></icon>{{ $t('themeCollection') }}
            </el-dropdown-item>
            <el-dropdown-item command="TagsCollection">
              <icon class="vector-icon" name="tag"></icon>{{ $t('tagsCollection') }}
            </el-dropdown-item>
            <el-dropdown-item command="" divided> </el-dropdown-item>
            <el-dropdown-item command="OfficialRecommend">
              <icon class="vector-icon" name="heart"></icon>{{ $t('officialRecommend') }}
            </el-dropdown-item>
            <el-dropdown-item command="" divided> </el-dropdown-item>
            <el-dropdown-item command="Recommend">
              <icon class="vector-icon" name="likes"></icon>{{ $t('RecommendGoodWebsite') }}
            </el-dropdown-item>
            <el-dropdown-item command="" divided> </el-dropdown-item>
            <el-dropdown-item command="ProductCemetery">
              <icon class="vector-icon" name="product-cemetery"></icon>{{ $t('productCemetery') }}
            </el-dropdown-item>
            <el-dropdown-item command="" divided> </el-dropdown-item>
            <el-dropdown-item command="">
              <icon class="vector-icon" name="about-website"></icon>
              <a class="about-website" @click="onAboutSiteClick" target="_blank" rel="noopener"
                :href="getAboutWebsiteLink">
                {{ $t('aboutWebsite') }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item command="AboutAuthor">
              <icon class="vector-icon" name="about-author"></icon>{{ $t('aboutAuthor') }}
            </el-dropdown-item>
            <el-dropdown-item v-if="isAdminFlag" command="Manage">
              <icon class="vector-icon" name="setting"></icon>{{ $t('management') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <SwitchTheme v-if="!$isMobile" />

      <div class="search-area" id="search-area" v-if="!$isMobile">
        <search />
      </div>
      <div class="user-account" v-if="$isLogin()">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <img class="avatar" :src="userAvatar" :alt="$t('niceLinksStr')" />
            <span>{{ userSign }} </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="MainPage">
              <icon class="icons" name="main-page"></icon>{{ $t('homepage') }}
            </el-dropdown-item>
            <el-dropdown-item command="Setting" divided>
              <icon class="icons" name="setting"></icon>{{ $t('accountSetting') }}
            </el-dropdown-item>
            <el-dropdown-item command="Logout" divided>
              <icon class="icons" name="logout"></icon>{{ $t('signOut') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="not-loggedin">
        <el-button type="text" @click="onGotoLoginClick">{{ $t('signIn') }}</el-button>
        <span>/</span>
        <el-button type="text" @click="onGotoSignUpClick">
          {{ $t('signUp') }}
        </el-button>
      </div>
    </nav>
  </header>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/dropdown.css'
import 'element-ui/lib/theme-chalk/dropdown-menu.css'
import 'element-ui/lib/theme-chalk/dropdown-item.css'
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

import SwitchTheme from '../components/SwitchTheme.vue'
import CLASSIFY_CONF from './../config/classify'
import THEME_CONF from './../config/theme'
import { REPORT_PATH } from 'config/constant'
import { openAuthorSite, interceptString } from './../helper/tool'

export default {
  name: 'HeaderNav',

  data() {
    return {
      isShowDlgFlag: false,
      navList: CLASSIFY_CONF,
    }
  },

  components: {
    SwitchTheme,
  },

  watch: {
    $route: function (to, from) {
      // this.updateNavActive()
      this.hideSidenav()
    },
  },

  computed: {
    userSign() {
      if (this.userInfo && !this.$isMobile) {
        const nickname = this.userInfo.profile && this.userInfo.profile.nickname
        return nickname || this.genFitUsername() || this.userInfo.email
      }
    },
    isAdminFlag() {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    },
    userAvatar() {
      if (this.userInfo) {
        let defaultAvatar = 'https://image.lovejade.cn/default-avatar.jpeg'
        let userAvatar = this.userInfo.profile && this.userInfo.profile.avatar
        return userAvatar ? `/api/avatar/${userAvatar}` : defaultAvatar
      }
    },
    getAboutWebsiteLink() {
      return `https://site.lovejade.cn/about?utm_source=nicelinks.site`
    },
  },

  methods: {
    // updateNavActive() {
    //   let tempPathArr = this.$route.path.split('/') || []
    //   this.activeName = tempPathArr[tempPathArr.length - 1]
    // },

    genFitUsername() {
      return interceptString(this.userInfo.username, 8)
    },

    makeClassName(classifyName) {
      const intrinsicName = 'nav-item '
      const routeClassify = this.$route.params.classify
      const currentClssify = routeClassify || this.getClassifyByTheme()
      const isMatch = classifyName === currentClssify
      return isMatch ? `${intrinsicName}active` : intrinsicName
    },

    getClassifyByTheme() {
      const routeTheme = this.$route.params.theme
      if (!routeTheme) return ''

      let clssifyIndex = 0
      THEME_CONF.forEach((items, index) => {
        items.forEach((item) => {
          if (item.value.toUpperCase() === routeTheme.toUpperCase()) {
            clssifyIndex = index
            return
          }
        })
      })
      return CLASSIFY_CONF[clssifyIndex].name
    },

    hideSidenav() {
      document.getElementById('app').className = ''
    },

    handleCommand(command) {
      if (!command) return
      this['on' + command + 'Click']()
    },

    // -------------------------onClickEvent-------------------------Start
    onThemeCollectionClick() {
      this.$gtagTracking('theme-collection', 'header', 'p-theme-collection')
      this.$router.push('/collections/theme')
    },

    onTagsCollectionClick() {
      this.$gtagTracking('tags-collection', 'header', 'p-tags-collection')
      this.$router.push('/collections/tags')
    },

    onManageClick() {
      this.$router.push('/manage')
    },

    onAboutAuthorClick() {
      this.$gtagTracking('about-author', 'header', 'p-about-author')
      openAuthorSite('header')
    },

    onToggleMenuClick() {
      this.$gtagTracking('trigger-sidenav', 'header', 'p-trigger-sidenav')
      this.$triggerSidenav()
    },

    onGotoLoginClick() {
      this.$gtagTracking('login', 'header', 'p-login')
      this.$switchToLogin()
    },

    onGotoSignUpClick() {
      this.$gtagTracking('signup', 'header', 'p-signup')
      this.$router.push('/register')
    },

    onMainPageClick() {
      this.$gtagTracking('personal-home-page', 'header', 'p-personal-home-page')
      let userName = this.userInfo.username || this.userInfo._id
      this.$router.push(`/member/${userName}`)
    },

    onSettingClick() {
      this.$gtagTracking('personal-setting', 'header', 'p-personal-setting')
      this.$router.push('/setting')
    },

    onLogoutClick() {
      this.$gtagTracking('personal-logout', 'header', 'p-personal-logout')
      this.$apis
        .logout()
        .then((result) => {
          this.$message({
            message: `您已成功退出登录🤝`,
            type: 'success',
          })

          this.$switchToLogin()
          this.$vuexSetUserInfo({})
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
    },

    onShareBtnMouseover() {
      document.querySelectorAll('#share path')[0].setAttribute('fill', '#20a0ff')
    },

    onShareBtnMouseout() {
      document.querySelectorAll('#share path')[0].setAttribute('fill', '#000000')
    },

    onProductCemeteryClick() {
      this.$gtagTracking('product-cemetery', 'header')
      this.$router.push('/cemetery')
    },

    onRecommendClick() {
      this.$gtagTracking('site-recommend', 'header')
      window.open(REPORT_PATH)
    },

    onOfficialRecommendClick() {
      this.$gtagTracking('official-recommend', 'header')
      this.$router.push('/recommend')
    },

    onExploreClick(item) {
      this.$gtagTracking(`explore-${item.name}`, 'header')
      this.$adsConversionReport(`from-explore-${item.name}`)
    },

    onShareClick() {
      this.$gtagTracking('share-link', 'header')
      this.$adsConversionReport('from-share-link')
    },

    onAboutSiteClick() {
      this.$gtagTracking('header-about-website', 'header')
    },

    onHomeClick() {
      this.$gtagTracking('logo-link', 'header')
      this.$adsConversionReport('from-logo-link')
    },
  },
}
</script>

<style media="screen" lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';

#app .header {
  position: fixed;
  @include flex-box-center(row, space-between, start);
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  padding: 0 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
  z-index: 9999;

  .nav {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: start !important;
    align-items: center;
    width: 100%;
    height: 100%;

    .header-logo {
      @include flex-box-center(row, center, center);
      margin-right: 2rem;

      .header-logo-a {
        @include flex-box-center;
        height: $header-height / 2;
        line-height: $header-height / 2;
      }
    }

    .operate-area {
      display: block;
      position: relative;
      font-size: $font-small;

      .nav-item {
        color: $black;
        margin: 0 1rem;

        &:hover {
          color: $brand;
        }
      }

      .nav-item.active {
        color: $brand;
      }
    }

    .share-btn {
      font-size: $font-small;

      .share-link {
        @include flex-box-center(row, space-around, center);
        font-weight: bold;

        .gradient-text {
          -webkit-text-fill-color: transparent;
          background: linear-gradient(90deg, #f7acbc, #ffc20e, #ed1941);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .icon-share {
          width: 16px;
          height: 16px;
          margin: 0 0.3rem;
          vertical-align: middle;
        }
      }
    }

    .share-btn,
    .find-more {
      display: block;
      cursor: pointer;
      margin: 0 0 0 2rem;
    }

    .find-more,
    .user-account {
      height: 100%;

      .el-dropdown {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: $font-small;

        .el-dropdown-link {
          display: flex !important;
          align-items: center !important;
          line-height: $header-mobile-height;
          height: $header-mobile-height;
        }
      }
    }

    .user-account {
      display: block;
      cursor: pointer;

      .avatar {
        display: block;
        width: 4rem;
        height: 4rem;
        aspect-ratio: 1 / 1;
        box-shadow: 0 0 0 2px #fff;
        border-radius: 50%;
        position: relative;
        margin: 0;
        margin-right: 10px !important;
      }
    }

    .not-loggedin,
    .el-dropdown {
      display: block;

      .el-button {
        font-size: $font-small;
      }
    }

    .not-loggedin,
    .user-account {
      position: absolute;
      right: 0;
    }
  }
}

.el-dropdown-menu {
  min-width: 15rem;
  margin: 0;
  text-align: center;

  .icons {
    vertical-align: middle;
    width: 2rem;
    height: 2rem;
    margin: 0.1rem 0.5rem 0.1rem 0.1rem;
    color: #130c0e;
  }

  .vector-icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    color: #130c0e;
  }
}

.find-more-dropdown-menu {
  .el-dropdown-menu__item {
    display: flex !important;
    align-items: center !important;
    justify-content: space-evenly;
    text-align: center;
    padding: 0 20px;
  }
}

.find-more-dropdown-menu {
  .el-dropdown-menu__item--divided {
    margin: 3px 1px;

    &:before {
      height: 0;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .about-website {
    color: $dropdown-grey;
  }
}

@media screen and (max-width: $mobile-screen) {
  #app .header {
    height: $header-mobile-height;
    z-index: $zindex-header-mobile;
    padding: 0;

    .nav {
      padding: 0;

      .header-logo {
        position: absolute;
        left: 50%;
        right: 50%;
        width: 15rem;
        transform: translate(-50%);
        text-align: center;
        margin: 0px;
      }

      .header-logo-a {
        width: 100%;
        height: $header-mobile-height;
        line-height: $header-mobile-height;

        .header-logo-img {
          margin: 10px 0;
        }
      }

      .menu {
        display: block;
        padding: 20px 15px;
        width: $header-mobile-height;
        height: $header-mobile-height;
      }

      .not-loggedin,
      .el-dropdown-link {
        display: flex !important;
        align-items: center !important;
        line-height: $header-mobile-height;
        height: $header-mobile-height;
        margin-right: 1rem;
      }

      .operate-area {
        display: none;
      }

      .share-btn,
      .find-more {
        font-size: $font-small;
        display: none;
      }
    }
  }
}

.search-area {
  display: block;
  position: absolute;
  right: 23rem;

  .el-autocomplete {
    .el-input {
      font-size: $font-medium;
    }
  }
}

@media (max-width: 1200px) {
  .search-area {
    display: none;
  }
}
</style>

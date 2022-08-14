<template>
  <div id="header-nav">
    <header class="header">
      <nav class="nav">
        <div class="header-logo">
          <a
            href="/"
            class="header-logo-a nicelinks-logo gtag-track"
            data-action="logo-link"
            data-category="header"
            data-label="logo-link"
          >
            <img src="/static/img/favicons/safari-pinned-tab.svg" :alt="$t('niceLinksStr')" />
            <h1 class="title">{{ $t('niceLinksStr') }}</h1>
          </a>
        </div>

        <a href="javascript:;" class="menu" @click="onToggleMenuClick">
          <span></span>
        </a>

        <div class="operate-area">
          <router-link
            v-for="item in navList"
            :key="item.value"
            :to="'/explore/' + item.name"
            :class="makeClassName(item.name)"
            :data-action="'explore-' + item.name"
            :data-category="header"
            :data-label="'p-explore-' + item.name"
          >
            {{ $t(item.name) }}
          </router-link>
        </div>

        <div class="share-btn" @mouseenter="onShareBtnMouseover" @mouseout="onShareBtnMouseout">
          <router-link
            to="/share-link"
            class="share-link gtag-track"
            data-action="share-link"
            data-category="header"
            data-label="p-share-link"
            >🕊 {{ $t('shareNewLink') }}
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
              <el-dropdown-item command="Recommend">
                <icon class="vector-icon" name="likes"></icon>优站推荐
              </el-dropdown-item>
              <el-dropdown-item command="" divided> </el-dropdown-item>
              <el-dropdown-item command="ProductCemetery">
                <icon class="vector-icon" name="product-cemetery"></icon>{{ $t('productCemetery') }}
              </el-dropdown-item>
              <el-dropdown-item command="" divided> </el-dropdown-item>
              <el-dropdown-item command="">
                <icon class="vector-icon" name="about-website"></icon>
                <a
                  class="about-website gtag-track"
                  data-action="header-about-website"
                  data-category="header"
                  data-label="header-about-website"
                  target="_blank"
                  rel="noopener"
                  :href="getAboutWebsiteLink"
                >
                  {{ $t('aboutWebsite') }}
                </a>
              </el-dropdown-item>
              <el-dropdown-item command="AboutAuthor">
                <icon class="vector-icon" name="about-author"></icon>{{ $t('aboutAuthor') }}
              </el-dropdown-item>
              <el-dropdown-item v-if="isAdminFlag" command="Manage">
                <i class="vector-icon el-icon-setting"></i>{{ $t('management') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="search-area" id="search-area" v-if="!isMobile">
          <search />
        </div>

        <div class="user-account" v-if="$isLogin()">
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              <img class="avatar" :src="userAvatar" :alt="$t('niceLinksStr')" />
              <span>{{ userSign }} </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="user-account-dropdown-menu">
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
          <span v-if="isShowSignUp">/</span>
          <el-button v-if="isShowSignUp" type="text" @click="onGotoSignUpClick">
            {{ $t('signUp') }}
          </el-button>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import Vue from 'vue'
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

import $config from 'config'
import partsMixin from 'mixins/partsMixin.js'
import pageMixin from 'mixins/pageMixin.js'
import { REPORT_PATH } from 'config/constant'
import { openAuthorSite } from './../helper/tool'

export default {
  name: 'HeaderNav',

  mixins: [partsMixin, pageMixin],

  data() {
    return {
      isShowDlgFlag: false,
      isMobile: window.innerWidth <= 1200,
      navList: Object.freeze($config.classify),
    }
  },

  components: {},

  watch: {
    $route: function (to, from) {
      // this.updateNavActive()
      this.hideSidenav()
    },
  },

  computed: {
    userSign() {
      if (this.userInfo && !this.isMobile) {
        const nickname = this.userInfo.profile && this.userInfo.profile.nickname
        return nickname || this.userInfo.username || this.userInfo.email
      }
    },
    isAdminFlag() {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    },
    userAvatar() {
      if (this.userInfo) {
        let defaultAvatar = 'https://image.nicelinks.site/default-avatar.jpeg'
        let userAvatar = this.userInfo.profile && this.userInfo.profile.avatar
        return userAvatar ? `/api/avatar/${userAvatar}` : defaultAvatar
      }
    },
    isShowSignUp() {
      return window.innerWidth >= 480 || this.$getCurrentLang() === 'zh'
    },
    getAboutWebsiteLink() {
      return `https://nicelinks.site/about?utm_source=nicelinks.site`
    },
  },

  mounted() {},

  methods: {
    updateNavActive() {
      // let tempPathArr = this.$route.path.split('/') || []
      // this.activeName = tempPathArr[tempPathArr.length - 1]
    },

    makeClassName(classifyName) {
      const intrinsicName = 'nav-item gtag-track '
      const routeClassify = this.$route.params.classify
      const currentClssify = routeClassify || this.getClassifyByTheme()
      const isMatch = classifyName === currentClssify
      return isMatch ? `${intrinsicName}active` : intrinsicName
    },

    getClassifyByTheme() {
      const routeTheme = this.$route.params.theme
      if (!routeTheme) return ''

      let clssifyIndex = 0
      $config.theme.forEach((items, index) => {
        items.forEach((item) => {
          if (item.value.toUpperCase() === routeTheme.toUpperCase()) {
            clssifyIndex = index
            return
          }
        })
      })
      return $config.classify[clssifyIndex].name
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
      this.$gtagTracking('product-cemetery', 'header', 'product-cemetery')
      this.$router.push('/cemetery')
    },

    onRecommendClick() {
      this.$gtagTracking('site-recommend', 'header', 'site-recommend')
      window.open(REPORT_PATH)
    },
  },
}
</script>

<style media="screen" lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';

.header {
  position: fixed;
  width: 100%;
  @include height-center($header-height);
  backdrop-filter: blur(18px);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transition: border 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955),
    background 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  .nav {
    height: 100%;
    padding: 0 15px;

    .header-logo {
      display: inline-block;
      float: left;
      margin: 20px 0;
      width: 180px;

      .header-logo-a {
        @include flex-box-center;
        height: $header-height / 2;
        line-height: $header-height / 2;
      }
    }

    .operate-area {
      display: inline-block;
      position: relative;
      margin-right: 12px;
      float: left;
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
        color: transparent;
        background-image: linear-gradient(0deg, #ff6768 38%, #a3cd39 60%);
        background-clip: text;
        -webkit-background-clip: text;
        font-weight: bold;

        .icon-share {
          width: 16px;
          height: 16px;
          margin: 0 0.3rem;
          vertical-align: middle;
        }

        &:hover {
          background-image: linear-gradient(0deg, #ff6768 38%, #a3cd39 81%);
        }
      }
    }

    .share-btn,
    .find-more {
      cursor: pointer;
      margin: 0 1.5rem;
      display: inline-block;
      float: left;
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
      cursor: pointer;
      display: inline-block;
      float: right;

      .avatar {
        height: 38px;
        width: 38px;
        box-shadow: 0 0 0 2px #fff;
        border-radius: 50%;
        position: relative;
        margin: 0;
        margin-right: 10px !important;
      }
    }

    .not-loggedin,
    .el-dropdown {
      display: inline-block;
      float: right;
      margin-right: 15px;

      .el-button {
        font-size: $font-small;
      }
    }
  }
}

.el-dropdown-menu {
  min-width: 15rem;
  margin: 0;

  .icons {
    vertical-align: middle;
    width: 2rem;
    height: 2rem;
    margin: 0.1rem 0.5rem 0.1rem 0.1rem;
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

    .nav {
      padding: 0;

      .header-logo {
        float: none !important;
        text-align: center;
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%);
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
  right: 22rem;

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

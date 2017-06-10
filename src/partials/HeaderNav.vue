<template>
<div class="">
  <header class="header">
    <nav class="nav">
      <div class="header-logo">
        <h1><a  class="header-logo-a" href="javascript:;" @click="onLogoClick">
          <img class="header-logo-img" src="./../assets/images/nice_links.png" alt="">
        </a></h1>
      </div>

      <a href="javascript:;" class="menu" @click="onToggleMenuClick" >
        <span></span>
      </a>

      <div class="operate-link">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="item in navList"
            :key="item.value" :label="item.key" :name="item.value">
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="inject-btn">
        <el-button
          type="primary"
          icon="plus"
          size="small"
          @click="activateInjectDlg">{{ $t('injectLinks') }}
        </el-button>
      </div>

      <div class="account-dropdown" v-if="isLogin">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <img class="avatar" src="https://secure.gravatar.com/avatar/aa70f832a1d99c89afcbfae9070f38d6?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault42.png&secure=true" alt="">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="MainPage"><icon class="icons" name="main-page"></icon>我的主页</el-dropdown-item>
            <el-dropdown-item command="Setting"><icon class="icons" name="setting"></icon>设置</el-dropdown-item>
            <el-dropdown-item command="Logout" divided><icon class="icons" name="logout"></icon>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="not-loggedin">
        <el-button type="text" @click="onGotoLoginClick">登录</el-button>
        <span>/</span>
        <el-button type="text" @click="onGotoRegisterClick">注册</el-button>
      </div>
    </nav>
  </header>
</div>
</template>

<script>
import { $config } from 'config'
import { $auth, $apis } from 'helper'

export default {
  data () {
    return {
      isShowDlgFlag: false,
      activeName: '-1',
      navList: $config.classify,
      isLogin: $auth.checkSession()
    }
  },

  components: {
  },

  mounted () {
    this.isLogin = $auth.checkSession()
  },

  methods: {
    activateInjectDlg () {
      this.$bus.emit('activate-inject-dlg')
    },

    handleClick (tab) {
      this.$router.push('/')
      this.$bus.emit('switch-nav', tab.name)
    },

    handleCommand (command) {
      this['on' + command + 'Click']()
    },

    // -------------------------onClickEvent-------------------------Start
    onLogoClick () {
      this.$router.push('/')
      this.$bus.emit('switch-nav')
    },

    onToggleMenuClick () {
      this.$bus.$emit('trigger-sidenav')
    },

    onGotoLoginClick () {
      this.$router.push('/login')
    },

    onGotoRegisterClick () {
      this.$router.push('/login')
    },

    onMainPageClick () {
    },

    onSettingClick () {
      this.$router.push('/setting')
    },

    onLogoutClick () {
      $apis.logout().then(result => {
        this.$router.push('/login')
        this.$message({
          message: result.message,
          type: 'success'
        })
      }).catch((error) => {
        this.$message.error(`${error}`)
      })
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
@import "./../assets/scss/mixins.scss";

.header{
  position: fixed;
  width: 100%;
  @include height-center($header-height);
  background-color: #fff;
  border-bottom: solid 1px $moudle-border-color;
  z-index: 999;
  transition: border .5s cubic-bezier(0.455, 0.03, 0.515, 0.955), background .5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  .nav{
    height: 100%;
    padding: 0 15px;
    .header-logo{
      display: inline-block;
      float: left;
      margin: 18px 20px 18px 0;
      width: 13em;
      .header-logo-a{
        height: $header-height / 2;
        color: #333;
        .header-logo-img{
          width: 100%;
        }
      }
    }
    .operate-link{
      display: inline-block;
      margin-right: 20px;
      float: left;
    }
    .inject-btn{
      display: inline-block;
      float: left;
    }
    .account-dropdown{
      display: inline-block;
      float: right;
      .avatar{
        border-radius: 50%;
        height: 38px;
        width: 38px;
        box-shadow: 0 0 0 2px #fff;
        position: relative;
        margin: 0;
      }
    }
    .not-loggedin{
      display: inline-block;
      float: right;
      margin-right: 15px;
    }
  }
}
.el-dropdown-menu{
  min-width: 180px;
  .icons{
    margin-left: 0;
    vertical-align: middle !important;
  }
}
</style>

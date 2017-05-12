<template>
<div class="">
  <header class="header">
    <nav class="nav">
      <div class="header-logo">
        <h1><a  class="header-logo-a" href="javascript:;" @click="onLogoClick">
          <img src="./../assets/images/nice_links.png" alt="">
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

      <div class="account-dropdown">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <img class="avatar" src="https://secure.gravatar.com/avatar/aa70f832a1d99c89afcbfae9070f38d6?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault42.png&secure=true" alt="">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a"><icon class="icons" name="main-page"></icon>我的主页</el-dropdown-item>
            <el-dropdown-item command="b"><icon class="icons" name="setting"></icon>设置</el-dropdown-item>
            <el-dropdown-item command="c" divided><icon class="icons" name="logout"></icon>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
  </header>
</div>
</template>

<script>
import { $config } from 'config'

export default {
  data () {
    return {
      isShowDlgFlag: false,
      activeName: '-1',
      navList: $config.classify
    }
  },

  components: {
  },

  methods: {
    onLogoClick () {
      this.$bus.emit('switch-nav')
    },

    handleClick (tab) {
      this.$bus.emit('switch-nav', tab.name)
    },

    onToggleMenuClick () {
      this.$bus.$emit('trigger-sidenav')
    },

    activateInjectDlg () {
      this.$bus.emit('activate-inject-dlg')
    },

    handleCommand (command) {
      this.$message('click on item ' + command)
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
      width: 200px;
      .header-logo-a{
        height: $header-height / 2;
        color: #333;
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
  }
}
.el-dropdown-menu{
  min-width: 180px;
  .icons{
    vertical-align: middle !important;
  }
}
</style>

<template>
<div class="">
  <header class="header">
    <nav class="nav">
      <div class="col-sm-10">
        <div class="header-logo">
          <h1><a  class="header-logo-a" href="/">
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
      activeName: '0',
      navList: $config.classify
    }
  },

  components: {
  },

  methods: {
    handleClick (tab) {
      this.$bus.emit('switch-nav', tab.name)
    },

    onToggleMenuClick () {
      this.$bus.$emit('trigger-sidenav')
    },

    activateInjectDlg () {
      this.$bus.emit('activate-inject-dlg')
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
  border-bottom: solid 1px #d1d5da;
  z-index: 999;
  transition: border .5s cubic-bezier(0.455, 0.03, 0.515, 0.955), background .5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  .nav{
    height: 100%;
    .header-logo{
      display: inline-block;
      float: left;
      margin: 18px 0px;
      width: 200px;
      .header-logo-a{
        height: $header-height / 2;
        color: #333;
      }
    }
    .operate-link{
      display: inline-block;
      float: left;
    }
    .inject-btn{
      display: inline-block;
      float: right;
    }
  }
}
</style>

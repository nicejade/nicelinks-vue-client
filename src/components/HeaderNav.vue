<template>
<div class="">
  <header class="header">
    <nav class="nav">
      <div class="nav-left col-sm-10 col-md-8 col-lg-7">
        <div class="header-logo">
          <h1><a  class="header-logo-a" href="/">
            <img src="./../assets/images/nice_links.png" alt="">
          </a></h1>
        </div>

        <div class="nav-link">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in navList"
              :key="item.value" :label="item.key" :name="item.value">
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="header-btn">
          <el-button type="primary" icon="plus" size="small"
            @click="isShowDlgFlag = true">{{ $t('injectLinks') }}
          </el-button>
        </div>
      </div>
    </nav>
  </header>
  <inject-dialog v-model="isShowDlgFlag"></inject-dialog>
</div>
</template>

<script>
import InjectDialog from 'components/InjectDialog'
import { $config } from 'config'

export default {
  name: 'HeaderNav',
  data () {
    return {
      isShowDlgFlag: false,
      activeName: '0',
      navList: $config.classify
    }
  },

  components: {
    InjectDialog
  },

  methods: {
    handleClick (tab) {
      this.$bus.emit('switch-nav', tab.name)
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
    .nav-left{
      height: 100%;
      padding: 0;
      text-align: left;
      .header-logo{
        display: inline-block;
        float: left;
        margin: auto 15px;
        width: 200px;
        margin-top: $header-height / 4;
        .header-logo-a{
          height: $header-height / 2;
          color: #333;
        }
      }
      .nav-link{
        display: inline-block;
        float: left;
      }
      .header-btn{
        display: inline-block;
        float: right;
      }
    }
  }
}
</style>

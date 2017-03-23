<template>
<div>
  <header class="header">
    <nav class="nav">
      <div class="nav-left col-sm-10 col-md-8 col-lg-7">
        <div class="header-logo">
          <h1><a  class="header-logo-a" href="/">Nice Links</a></h1>
        </div>
        <el-button
          type="primary"
          icon="plus"
          size="small"
          @click="isShowDlgFlag = true">注入链接</el-button>
      </div>
    </nav>
  </header>
  <inject-dialog v-model="isShowDlgFlag"></inject-dialog>
</div>
</template>

<script>
import InjectDialog from 'components/InjectDialog'

export default {
  name: 'HeaderNav',
  data () {
    return {
      isShowDlgFlag: false
    }
  },

  components: {
    InjectDialog
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
    width: 100%;
    .nav-left{
      width: 100%;
      height: 100%;
      padding: 0;
      .header-logo{
        display: inline-block;
        .header-logo-a{
          @include height-center($header-height);
          color: #333;
        }
      }
    }
  }
}
</style>

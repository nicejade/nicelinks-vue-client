<template>
  <div class="wrapper" id="homepage">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('homePage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ $t('homepage') }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的发布" name="first"></el-tab-pane>
                <el-tab-pane label="我的点赞" name="second"></el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'HomePage',

  components: {
  },

  data () {
    return {
      isLoading: false,
      activeName: 'first',
      fillForm: {
      },
      rules: {}
    }
  },

  methods: {
    handleClick () {}
  },

  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>


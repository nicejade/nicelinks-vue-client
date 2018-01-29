<template>
  <div id="theme-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="classify-title">{{ $t('themeCollection') }}</h3>
            <div v-for="(obj, index) in themeList" :key="index">
              <el-button class="radius-btn" v-for="item in obj" :key="item.value"
                type="text" @click="onItemClick(item)">
                {{ item.key }}
              </el-button>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'ThemeCollections',

  data () {
    return {
      isLoading: false,
      classifyList: $config.classify,
      themeList: $config.theme
    }
  },

  watch: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    onItemClick (item) {
      this.$switchRouteByTheme(item.value)
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#theme-coll-page{
  .entry-list{
    padding: 15px;
    .classify-title{
      font-size: $font-large;
      font-weight: 500;
      margin: 15px auto;
    }
  }
}
</style>

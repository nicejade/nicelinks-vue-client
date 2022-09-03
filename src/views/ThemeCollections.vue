<template>
  <div id="theme-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="classify-title">{{ $t('themeCollection') }}</h3>
            <div v-for="(obj, index) in themeList" :key="index">
              <a @click="onThemeClick(item)" v-for="item in obj" :key="item.value" class="radius-btn"
                :href="`/theme/${item.value.toLocaleLowerCase()}`">
                {{ item.key }}
              </a>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CLASSIFY_CONF from './../config/classify'
import THEME_CONF from './../config/theme'

export default {
  name: 'ThemeCollections',

  data() {
    return {
      isLoading: false,
      classifyList: CLASSIFY_CONF,
      themeList: THEME_CONF,
    }
  },

  mounted() {
    this.$setPageTitle(this.$t('themeCollection'))
  },

  methods: {
    onThemeClick(item) {
      this.$gtagTracking(`themes-${item.value}`, 'collections-themes')
    }
  },
}
</script>

<style lang="scss">
@import './../assets/scss/variables.scss';

#theme-coll-page {
  .entry-list {
    padding: 15px;

    .classify-title {
      font-size: $font-large;
      font-weight: 500;
      margin: 15px auto;
    }
  }
}
</style>

<template>
  <div id="theme-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="classify-title">{{ $t('themeCollection') }}</h3>
            <div v-for="(obj, index) in themeList" :key="index">
              <a
                v-for="item in obj"
                :key="item.value"
                class="gtag-track radius-btn"
                :data-action="`themes-${item.value}`"
                data-category="collections-themes"
                :data-label="`themes-${item.value}`"
                :href="`/theme/${item.value.toLocaleLowerCase()}`"
              >
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
import $config from 'config'
import pageMixin from 'mixins/pageMixin.js'

export default {
  name: 'ThemeCollections',

  mixins: [pageMixin],

  data() {
    return {
      isLoading: false,
      classifyList: $config.classify,
      themeList: $config.theme,
    }
  },

  watch: {},

  created() {},

  mounted() {
    document.title = `${this.$t('themeCollection')} - ${this.$t('niceLinksStr')}`
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

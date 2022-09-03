<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h2>
                  <strong>{{ $t('aboutNiceLinks') }}</strong>
                </h2>
              </div>
              <preview-md :value="aboutMarkdown"></preview-md>
            </el-card>
            <Waline />
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewMd from 'components/markdown/PreviewMd.vue'
import Waline from 'components/Waline'
import ABOUT_CONF from './../config/about'

export default {
  name: 'About',

  data() {
    return {
      aboutMarkdown: Object.freeze(ABOUT_CONF),
    }
  },

  watch: {},

  components: {
    PreviewMd,
    Waline
  },

  mounted() {
    this.updatePageMeta()
  },

  methods: {
    updatePageMeta() {
      this.$setPageTitle('关于')
    },
  },
}
</script>

<style type="text/css" lang="scss">
</style>

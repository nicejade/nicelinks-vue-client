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
            <div id="waline"></div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'
import PreviewMd from 'components/markdown/PreviewMd.vue'

export default {
  name: 'About',

  data() {
    return {
      aboutMarkdown: $config.about,
    }
  },

  watch: {},

  components: {
    PreviewMd,
  },

  mounted() {
    this.updatePageMeta()
    // Add Waline Comment Functions @2022.01.24
    this.$util.addWalineComment()
  },

  methods: {
    updatePageMeta() {
      document.title = `关于倾城 - ${this.$t('niceLinksStr')}`
    },
  },
}
</script>

<style type="text/css" lang="scss"></style>

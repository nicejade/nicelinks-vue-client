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

  mounted() {},

  methods: {},
}
</script>

<style type="text/css" lang="scss"></style>

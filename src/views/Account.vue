<template>
  <div class="wrapper account">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail" v-show="failureMessage">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h2>{{ $t('validateFailure') }}</h2>
              </div>
              <div class="no-result-tip" v-html="failureMessage"></div>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $apis, $util } from 'helper'
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'Account',

  mixins: [metaMixin],

  data() {
    const vm = this
    return {
      title: vm.$t('accountActivation'),
      isLoading: false,
      failureMessage: '',
    }
  },

  watch: {},

  components: {},

  mounted() {
    this.dispatchActivate()
  },

  methods: {
    dispatchActivate() {
      let params = {
        activeToken: $util.query(window.location.href).activeToken,
      }
      this.isLoading = true
      $apis
        .active(params)
        .then((result) => {
          this.$message({
            message: result,
            type: 'success',
          })
          setTimeout(() => {
            this.isLoading = false
            this.$router.push('/login')
          }, 600)
        })
        .catch((error) => {
          this.isLoading = false
          this.failureMessage = error
        })
    },
  },
}
</script>

<style type="text/css" lang="scss"></style>

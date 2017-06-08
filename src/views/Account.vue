<template>
<div class="wrapper account">
  <div class="panel-default" v-loading.body="isLoading">
    <div class="active-fail panel-body" v-show="failureMessage">
      <h4 class="text-left">验证失败</h4>
      <p class="failure-mesage" v-html="failureMessage"></p>
    </div>
  </div>
</div>
</template>

<script>
import { $apis, $util } from 'helper'

export default {
  name: 'Account',
  data () {
    return {
      isLoading: false,
      failureMessage: ''
    }
  },

  watch: {
  },

  components: {
  },

  mounted () {
    this.dispatchActivate()
  },

  methods: {
    dispatchActivate () {
      let params = {
        activeToken: $util.query(window.location.href).activeToken
      }
      this.isLoading = true
      $apis.active(params).then(result => {
        this.isLoading = false
        this.$message({
          message: result.message,
          type: 'success'
        })

        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }).catch(error => {
        this.isLoading = false
        this.failureMessage = error
      })
    }
  }
}
</script>


<style type="text/css" lang="scss">
.active-fail{
  .failure-mesage{
    text-align: left;
    line-height: 20px;
    margin: 15px;
    a{
      color: #20a0ff;
    }
  }
}
</style>

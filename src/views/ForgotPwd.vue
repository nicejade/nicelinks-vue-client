<template>
  <div class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('homePage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ $t('resetPwd') }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="form-group">
                <el-alert
                  v-if="tipMessageObj.message"
                  :title="tipMessageObj.message"
                  :type="tipMessageObj.type">
                </el-alert>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">{{$t('registeredMailbox')}}:</label>
                <div class="col-sm-9">
                  <el-input placeholder="" v-model.trim="fillForm.email"></el-input>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                  <el-button type="primary" @click='onResetClick'>{{ $t('resetPwd' )}}</el-button>
                </div>
              </div>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $apis } from 'helper'

export default{
  name: 'setting',

  components: {
  },

  data () {
    return {
      isLoading: false,
      fillForm: {
        email: '',
        password: ''
      },
      tipMessageObj: {
        message: '',
        type: ''
      },
      operateFun: {
        '/forgot-pwd': 'requestResetPwd',
        '/reset-pwd': 'launchResetPwd'
      }
    }
  },

  methods: {
    requestResetPwd () {
      let params = {
        email: this.fillForm.email
      }
      $apis.requestResetPwd(params).then(result => {
        this.tipMessageObj = {
          message: result.message,
          type: 'success'
        }
      }).catch(error => {
        this.isLoading = false
        this.tipMessageObj = {
          message: error,
          type: 'error'
        }
      })
    },

    launchResetPwd () {
      // $util.encryptPwd(this.account.password)
    },

    onResetClick () {
      this[this.operateFun[this.$route.path]]()
    }
  },

  locales: {
    zh: {
      resetPwd: '重设密码',
      registeredMailbox: '注册邮箱'
    },
    en: {
      resetPwd: 'Reset Password  ',
      registeredMailbox: 'Registered Mailbox'
    }
  }
}
</script>

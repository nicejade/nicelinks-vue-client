<template>
  <div class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('firstPage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>重设密码</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="form-group" v-if="tipMessageObj.message">
                <el-alert :title="tipMessageObj.message" :type="tipMessageObj.type"> </el-alert>
              </div>
              <el-form :model="fillForm" :rules="rules" ref="validateForm">
                <div class="form-group" v-if="isShowFillPwd">
                  <label class="col-sm-3 control-label">设新密码：</label>
                  <div class="col-sm-9">
                    <el-form-item prop="password">
                      <el-input
                        placeholder=""
                        type="password"
                        v-model.trim="fillForm.password"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="form-group" v-else>
                  <label class="col-sm-3 control-label">注册邮箱：</label>
                  <div class="col-sm-9">
                    <el-form-item prop="email">
                      <el-input placeholder="" v-model.trim="fillForm.email"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                  <el-button type="primary" @click="onResetClick">{{ $t('resetPwd') }}</el-button>
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
import { encryptPwd, isLegalEmail, isLegalPassword } from './../helper/tool'

export default {
  name: 'ForgotPwd',

  data() {
    return {
      isLoading: false,
      isShowFillPwd: false,
      fillForm: {
        email: '',
        password: '',
      },
      tipMessageObj: {
        message: '',
        type: '',
      },
      operateFun: {
        '/forgot-pwd': 'requestResetPwd',
        '/reset-pwd': 'launchResetPwd',
      },
      rules: {
        email: [{ required: true, validator: this.validateEmail, trigger: 'change,blur' }],
        password: [{ required: true, validator: this.validatePassword, trigger: 'change,blur' }],
      },
    }
  },

  mounted() {
    this.$setPageTitle(this.$t('resetPwd'))

    if (this.$util.getUrlParam('resetPasswordToken')) {
      this.isShowFillPwd = true
    }
  },

  methods: {
    launchRequest(params) {
      this.$refs['validateForm'].validate((valid) => {
        if (valid) {
          this.isLoading = false
          this.$apis
            .requestResetPwd(params)
            .then((result) => {
              this.tipMessageObj = {
                message: result,
                type: 'success',
              }
            })
            .catch((error) => {
              this.isLoading = false
              this.tipMessageObj = {
                message: error,
                type: 'error',
              }
            })
        }
      })
    },

    validateEmail(rule, value, callback) {
      if (!value || value.length <= 0) {
        callback(new Error(this.$t('enterEmailTip')))
      } else if (!isLegalEmail(value)) {
        callback(new Error(this.$t('enterLegalEmailTip')))
      } else {
        callback()
      }
    },

    validatePassword(rule, value, callback) {
      if (!value || value.length <= 0) {
        callback(new Error(this.$t('enterPwdTip')))
      } else if (!isLegalPassword(value)) {
        callback(new Error(this.$t('enterLegalPwdTip')))
      } else {
        callback()
      }
    },

    requestResetPwd() {
      let params = {
        email: this.fillForm.email,
      }
      this.launchRequest(params)
    },

    launchResetPwd() {
      let params = {
        resetPasswordToken: this.$util.getUrlParam('resetPasswordToken'),
        password: encryptPwd(this.fillForm.password),
        email: this.$util.getUrlParam('email'),
      }
      this.launchRequest(params)
    },

    onResetClick() {
      this[this.operateFun[this.$route.path]]()
    },
  }
}
</script>

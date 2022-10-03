<template>
  <div class="login-wrap">
    <div class="wechat-box" ref="wechat-box">
      <h2 class="box-title">微信扫码登录/注册</h2>
      <div class="qrcode-area">
        <qrcode-vue class="qrcode" :value="wechatQrCode" size="186" margin="3" level="H" />
        <div class="expired-area" v-if="isQrcodeExpired">
          <a href="javascript:;" @click="onGetQrcode">
            <p class="expired">二维码已过期</p>
            <p class="expired">点击重新获取</p>
          </a>
        </div>
      </div>
      <p class="scan-desc">关注"倾城之链官方服务号"快速登录</p>
      <div class="footer">
        <a href="/explore/all" class="route-to-main" @click="onLogoClick">
          {{ $t('niceLinksStr') }}
        </a>
        <a href="javascript:;" class="switch-to-account" @click="switchLoginMode(0)"
          >使用账号登录>></a
        >
      </div>
    </div>
    <div class="login-box display-none" ref="login-box" v-loading.body="isLoading">
      <h2 class="box-title">账号密码登录/注册</h2>
      <div class="form-group">
        <el-alert
          v-if="tipMessageObj.message"
          :title="tipMessageObj.message"
          :type="tipMessageObj.type"
        >
        </el-alert>
      </div>
      <el-form :model="account" :rules="rules" ref="validateForm">
        <el-form-item prop="username" v-if="isSignUpPage">
          <el-input
            v-model.trim.lazy="account.username"
            placeholder="请输入账号 ID"
            :icon="checkLoading ? 'loading' : ''"
            :autofocus="true"
            @blur="onBlurUsername"
            @keydown.enter.native="onKeyEnterClick"
          >
            <template slot="prepend">
              <icon class="icons" name="login-user"></icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email" v-if="isSignUpPage">
          <el-input
            placeholder="请输入邮箱"
            v-model.trim="account.email"
            @keydown.enter.native="onKeyEnterClick"
          >
            <template slot="prepend">
              <icon class="icons" name="login-email"></icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userinfo" v-if="!isSignUpPage">
          <el-input
            placeholder="请输入账号 ID"
            v-model.trim="account.userinfo"
            @keydown.enter.native="onKeyEnterClick"
          >
            <template slot="prepend">
              <icon class="icons" name="login-user"></icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请填写密码"
            v-model="account.password"
            type="password"
            @keydown.enter.native="onKeyEnterClick"
          >
            <template slot="prepend">
              <icon class="icons" name="password"></icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" v-if="!isSignUpPage" @click="onLoginClick" size="large">{{
          $t('signIn')
        }}</el-button>
        <el-button v-else @click="onSignupClick" size="large">{{ $t('signUp') }}</el-button>
        <el-button
          type="text"
          class="forgot-pwd"
          v-if="!this.isSignUpPage"
          @click="onForgotPwdClick"
          size="large"
          >{{ $t('forgetPwd') }}</el-button
        >
      </el-form>

      <div class="form-group login-tip">
        <p class="text-center">
          {{ isSignUpPage ? $t('signupBottomTip') : $t('signinBottomTip') }}
          <a class="el-button--text" href="javascript:;" @click="onBottomClick">
            {{ isSignUpPage ? $t('signIn') : $t('signUp') }}</a
          >
        </p>
      </div>
      <div class="footer">
        <a href="/explore/all" class="route-to-main" @click="onLogoClick">
          {{ $t('niceLinksStr') }}
        </a>
        <a href="javascript:;" class="switch-to-account" @click="switchLoginMode(1)"
          >使用微信登录</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

import { isLegalUsername, isLegalEmail, isLegalPassword, encryptPwd } from './../helper/tool'
import { waitForTimeout } from './../helper/system'
import { NICE_LINKS } from './../config/constant'
import { toggleClass } from './../helper/document'

const gRetryLimit = 60
let gRetryNum = 0

const gExpiredTime = 180
let gTimeCount = 0

export default {
  name: 'Login',

  data() {
    return {
      isLoading: false,
      checkLoading: false,
      tipMessageObj: {},
      account: {
        email: '',
        username: '',
        userinfo: '',
        password: '',
      },
      isQrcodeExpired: false,
      isLegalUsername: false,
      rules: {
        username: [{ required: true, validator: this.validateUsername, trigger: 'change,blur' }],
        email: [{ required: true, validator: this.validateEmail, trigger: 'change,blur' }],
        userinfo: [{ required: true, validator: this.validateUserinfo, trigger: 'change,blur' }],
        password: [{ required: true, validator: this.validatePassword, trigger: 'change,blur' }],
      },
      wechatQrCode: NICE_LINKS,
    }
  },

  mounted() {
    this.updatePageMeta(this.isSignUpPage)
    this.initWechatQrCode()
  },

  components: {
    QrcodeVue,
  },

  computed: {
    isSignUpPage() {
      return this.$route.path === '/register'
    },
  },

  watch: {
    isSignUpPage(val) {
      this.updatePageMeta(val)
    },
  },

  methods: {
    initWechatQrCode() {
      this.$apis
        .getWechatQrCode()
        .then((result) => {
          if (result.url) {
            this.wechatQrCode = result.url || NICE_LINKS
            this.checkAndLogin(result.ticket)
            this.handleQrcodeExpired()
          } else {
            this.$message.error(`${result.errmsg}`)
          }
        })
        .catch((error) => {
          console.log(`error：`, error)
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.resetWxLoginCounter()
          this.resetQrcodeExpired()
        })
    },

    resetWxLoginCounter() {
      gRetryNum = 0
      gTimeCount = 0
    },

    stopWechatQrCode() {
      gRetryNum = gRetryLimit
      gTimeCount = gExpiredTime
    },

    checkAndLogin(ticket) {
      if (gRetryNum > gRetryLimit) return

      this.$apis
        .checkIsSubscribe({ ticket })
        .then((result) => {
          if (result) this.route2lastpath(result)
        })
        .catch(async (error) => {
          gRetryNum += 1
          await waitForTimeout(2000)
          this.checkAndLogin(ticket)
          console.log(`error：`, error)
        })
    },

    async handleQrcodeExpired() {
      if (gTimeCount >= gExpiredTime) {
        this.isQrcodeExpired = true
        return
      }
      await waitForTimeout(1000)
      gTimeCount += 1
      this.handleQrcodeExpired()
    },

    resetQrcodeExpired() {
      gTimeCount = 0
      this.isQrcodeExpired = false
    },

    updatePageMeta(val) {
      const localeKey = val ? 'signUp' : 'signIn'
      this.title = this.$t(localeKey)
      this.$setPageTitle(this.title)
    },

    setMessageTip(msg, type = 'error') {
      this.tipMessageObj = {
        message: msg,
        type: type,
      }
    },

    queryUsername() {
      this.checkLoading = true
      let param = { username: this.account.username }
      this.$apis
        .checkIsExisted(param)
        .then((result) => {
          this.isLegalUsername = true
          this.checkLoading = false
          this.setMessageTip(null)
        })
        .catch((error) => {
          this.checkLoading = false
          this.isLegalUsername = false
          this.setMessageTip(error)
        })
    },

    /* **************************Validate Related************************** */
    validateUsername(rule, value, callback) {
      if (!value || value.length <= 0) {
        return callback(new Error(this.$t('enterUsernameTip')))
      } else if (!isLegalUsername(value)) {
        return callback(new Error(this.$t('enterLegalUsernameTip')))
      } else {
        callback()
      }
    },

    validateUserinfo(rule, value, callback) {
      if (!value || value.length <= 0) {
        return callback(new Error(this.$t('enterUserinfoTip')))
      } else {
        callback()
      }
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
      if (!this.isSignUpPage) {
        callback()
        return
      }

      if (!value || value.length <= 0) {
        callback(new Error(this.$t('enterPwdTip')))
      } else if (!isLegalPassword(value)) {
        callback(new Error(this.$t('enterLegalPwdTip')))
      } else {
        callback()
      }
    },

    route2lastpath(result) {
      this.$vuexSetUserInfo(result)

      const lastPathUrl = this.$store && this.$store.state.lastPathUrl
      if (lastPathUrl) {
        document.location.href = lastPathUrl
      } else {
        this.$router.push('/setting')
      }
    },

    // ----------------------------onClickEvent-----------------------------
    switchLoginMode(isToWechat) {
      isToWechat ? this.initWechatQrCode() : this.stopWechatQrCode()
      toggleClass(this.$refs['wechat-box'], 'display-none')
      toggleClass(this.$refs['login-box'], 'display-none')
    },

    onGetQrcode() {
      this.initWechatQrCode()
    },

    onKeyEnterClick() {
      const execFuncName = this.isSignUpPage ? 'onSignupClick' : 'onLoginClick'
      this[execFuncName]()
    },

    onLoginClick() {
      this.$gtagTracking('signin', 'login')
      this.isLoading = true
      this.$refs['validateForm'].validate((valid) => {
        if (valid) {
          const cIsLegalEmail = isLegalEmail(this.account.userinfo)
          const params = {
            email: cIsLegalEmail ? this.account.userinfo : '',
            username: cIsLegalEmail ? '' : this.account.userinfo,
            password: encryptPwd(this.account.password),
          }
          this.$apis
            .login(params)
            .then((result) => {
              // save user-id into vuex-state(& localStorage)
              this.route2lastpath(result)
            })
            .catch((error) => {
              this.isLoading = false
              this.setMessageTip(error)
            })
        } else {
          this.isLoading = false
          return false
        }
      })
    },

    onSignupClick() {
      this.$gtagTracking('signup', 'register')
      this.$refs['validateForm'].validate((valid) => {
        if (valid) {
          this.isLoading = false
          const params = {
            email: this.account.email,
            username: this.account.username,
            password: encryptPwd(this.account.password),
          }
          this.$apis
            .signup(params)
            .then((result) => {
              this.setMessageTip(result, 'success')
            })
            .catch((error) => {
              this.isLoading = false
              this.setMessageTip(error)
            })
        } else {
          return false
        }
      })
    },

    onForgotPwdClick() {
      this.$gtagTracking('forgot-pwd', 'login')
      this.$router.push('/forgot-pwd')
    },

    onBottomClick() {
      const registerPage = ['signin', 'register']
      const loginPage = ['register', 'login']
      const params = this.isSignUpPage ? registerPage : loginPage
      this.$gtagTracking(...params)
      this.$router.push(this.isSignUpPage ? '/login' : '/register')
    },

    onBlurUsername() {
      if (this.isSignUpPage) {
        this.queryUsername()
      }
    },

    onLogoClick() {
      this.$gtagTracking('login-logo-link', 'login')
    },
  },

  locales: {
    zh: {
      enterUsernameTip: '请输入账号 ID(仅限字母、数字、-，3至16位)',
      enterUserinfoTip: '请输入账号 ID 或邮箱',
      enterLegalUsernameTip: '请输入账号 ID(仅限字母、数字、-，3至16位)',
      signupBottomTip: `您已拥有一个账号？`,
      signinBottomTip: `您还未拥有一个账号？`,
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

#qrcode {
  width: 300px;
  height: 300px;
  display: block !important;
  canvas {
    display: inline-block;
  }
  img {
    width: 132px;
    height: 132px;
    background-color: #ffffff;
    padding: 6px;
  }
}

.login-wrap {
  width: 40rem;
  margin: 0 auto;
  padding-top: 12rem;
  position: relative;

  .forgot-pwd {
    margin: 0 auto !important;
  }

  .login-tip {
    font-size: 1.4rem;
  }

  .display-none {
    display: none;
  }

  .box-title {
    margin: 2rem auto;
    font-size: $font-large;
    font-weight: 600;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 3.5rem;
    margin-top: 2rem;
    background: #c9ffbf;
    background: -webkit-linear-gradient(to right, #ffafbd, #c9ffbf);
    background: linear-gradient(to right, #ffafbd, #c9ffbf);
    .route-to-main {
      color: $black;
      font-size: $font-small;
    }
  }

  .wechat-box {
    width: 40rem;
    height: 100%;
    background-color: $white;
    border: 1px solid #d7dce5;
    font-size: $font-small;
    .switch-to-account {
      display: block;
      padding: 1rem 0;
      text-align: right;
      color: $brand;
    }
    .scan-desc {
      font-size: 1.4rem;
      color: $silver-grey;
      padding: 2rem 0;
    }
    .qrcode-area {
      position: relative;
      width: 186px;
      height: 186px;
      margin: auto;
      .expired-area {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f7f8f9f6;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .expired {
          color: $black;
          line-height: 2rem;
        }
      }
    }
  }

  .login-box {
    width: 40rem;
    height: 100%;
    background-color: $white;
    clear: both;
    border-radius: 3px;
    border: 1px solid #d7dce5;
    .form-group,
    .el-form {
      padding: 0 2rem;
    }
    .heading {
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.4rem;
      color: $black;
    }

    .el-form-item {
      margin-bottom: 30px;
    }

    .el-button {
      display: block;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 15px;
      font-size: $font-small;
    }

    .el-input {
      .icons {
        display: block;
        width: 20px;
        height: 20px;
        margin: 0;
        padding: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .login-wrap {
    width: 100%;
    padding-top: 60px;
    .login-box,
    .wechat-box {
      width: 100%;
      border: 0 none;
      .switch-to-account {
        text-align: center;
      }
    }
  }
}
</style>

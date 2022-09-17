<template>
  <div class="login-wrap">
    <!-- <div class="wechat-box">
      <div id="qrcode"></div>
    </div> -->
    <div class="login-box" v-loading.body="isLoading">
      <a href="/explore/all" class="nicelinks-logo" @click="onLogoClick">
        <img src="/static/img/favicons/safari-pinned-tab.svg" :alt="$t('niceLinksStr')" />
        <h1>{{ $t('niceLinksStr') }}</h1>
      </a>
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
        <el-button type="text" v-if="!this.isSignUpPage" @click="onForgotPwdClick" size="large">{{
          $t('forgetPwd')
        }}</el-button>
      </el-form>
    </div>
    <div class="form-group login-bottom-tip">
      <p class="text-center">
        {{ isSignUpPage ? $t('signupBottomTip') : $t('signinBottomTip') }}
        <a class="el-button--text" href="javascript:;" @click="onBottomClick">
          {{ isSignUpPage ? $t('signIn') : $t('signUp') }}</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { isLegalUsername, isLegalEmail, isLegalPassword, encryptPwd } from './../helper/tool'

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
      isLegalUsername: false,
      rules: {
        username: [{ required: true, validator: this.validateUsername, trigger: 'change,blur' }],
        email: [{ required: true, validator: this.validateEmail, trigger: 'change,blur' }],
        userinfo: [{ required: true, validator: this.validateUserinfo, trigger: 'change,blur' }],
        password: [{ required: true, validator: this.validatePassword, trigger: 'change,blur' }],
      },
      wechatQrCode:
        'https://st2.depositphotos.com/3562409/8433/i/950/depositphotos_84332510-stock-photo-qr-cube.jpg',
    }
  },

  mounted() {
    this.updatePageMeta(this.isSignUpPage)
    // this.initWechatQrCode()
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
          console.log(`result：`, result)
          this.createQrCodeImg(result.url)
        })
        .catch((error) => {
          console.log(`error：`, error)
          this.$message.error(`${error}`)
        })
    },

    createQrCodeImg(target) {
      const qrcode = new QRCode(document.getElementById('qrcode'), {
        text: target,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
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

    // ----------------------------onClickEvent-----------------------------
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
              this.$vuexSetUserInfo(result)

              const lastPathUrl = this.$store && this.$store.state.lastPathUrl
              if (lastPathUrl) {
                document.location.href = lastPathUrl
              } else {
                this.$router.push('/')
              }
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

.login-wrap {
  width: 520px;
  margin: 0 auto;
  padding-top: 150px;
  min-height: 400px;
  position: relative;

  .login-bottom-tip {
    font-size: 1.56rem;
    padding: 15px 0;
  }
}

.wechat-box {
  width: 100%;
  height: 100%;
}

.login-box {
  width: 520px;
  padding: 30px 30px 0px 30px;
  height: 100%;
  background-color: #fff;
  clear: both;
  display: table;
  border-radius: 3px;
  border: 1px solid #d7dce5;

  .nicelinks-logo {
    margin-bottom: 1rem;
  }

  .heading {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.4rem;
    color: #707473;
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

@media (max-width: 500px) {
  .login-wrap {
    width: 100%;
    padding-top: 60px;
  }

  .login-box {
    width: 100%;
    border: 0 none;
  }
}
</style>

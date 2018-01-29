<template>
  <div class="login-wrap">
    <div class="login-box" v-loading.body="isLoading">
      <a href="/explore/all" class="nicelinks-logo">
        <img src="/static/img/favicons/safari-pinned-tab.svg"
          :alt="$t('niceLinksStr')">
        <h1>{{ $t('niceLinksStr') }}</h1>
      </a>
      <div class="form-group">
        <el-alert
          v-if="tipMessageObj.message"
          :title="tipMessageObj.message"
          :type="tipMessageObj.type">
        </el-alert>
      </div>
      <el-form :model="account" :rules="rules" ref="validateForm">
        <el-form-item prop="username" v-if="isSignUpPage">
          <el-input v-model.trim.lazy="account.username"
            :icon="checkLoading ? 'loading' : ''"  :autofocus='true'
            @blur="onBlurUsername"
            @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="login-user"></icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model.trim="account.email"
            @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="login-email"></icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password"
            @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="password"></icon></template>
          </el-input>
        </el-form-item>
        <el-button type="primary" v-if="!isSignUpPage"
          @click="onLoginClick" size="large">{{ $t('signIn') }}</el-button>
        <el-button v-else
          @click="onSignupClick" size="large">{{ $t('signUp') }}</el-button>
        <el-button type="text"
          @click="onForgotPwdClick" size="large">{{ $t('forgetPwd') }}</el-button>
      </el-form>
    </div>
    <div class="form-group login-bottom-tip">
      <p class="text-center">{{ isSignUpPage ? $t('signupBottomTip') : $t('signinBottomTip') }}
        <a class="el-button--text" href="javascript:;" @click="onBottomClick">
        {{ isSignUpPage ? $t('signIn') : $t('signUp') }}</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        isLoading: false,
        checkLoading: false,
        tipMessageObj: {},
        account: {
          email: '',
          username: '',
          password: ''
        },
        isLegalUsername: false,
        rules: {
          username: [
            {required: true, validator: this.validateUsername, trigger: 'change,blur'}
          ],
          email: [
            {required: true, validator: this.validateEmail, trigger: 'change,blur'}
          ],
          password: [
            {required: true, validator: this.validatePassword, trigger: 'change,blur'}
          ]
        }
      }
    },

    created () {
    },

    mounted () {
    },

    components: {
    },

    computed: {
      isSignUpPage () {
        return this.$route.path === '/register'
      }
    },

    methods: {
      composeParams () {
        return {
          email: this.account.email,
          username: this.account.username,
          password: this.$util.encryptPwd(this.account.password)
        }
      },

      setMessageTip (msg, type = 'error') {
        this.tipMessageObj = {
          message: msg,
          type: type
        }
      },

      queryUsername () {
        this.checkLoading = true
        let param = {username: this.account.username}
        this.$apis.checkIsExisted(param).then(result => {
          this.isLegalUsername = true
          this.checkLoading = false
          this.setMessageTip(null)
        }).catch(error => {
          this.checkLoading = false
          this.isLegalUsername = false
          this.setMessageTip(error)
        })
      },

      /* **************************Validate Related************************** */
      validateUsername (rule, value, callback) {
        if (!value || value.length <= 0) {
          return callback(new Error(this.$t('enterUsernameTip')))
        } else if (!this.$util.isLegalUsername(value)) {
          return callback(new Error(this.$t('enterLegalUsernameTip')))
        } else {
          callback()
        }
      },

      validateEmail (rule, value, callback) {
        if (!value || value.length <= 0) {
          callback(new Error(this.$t('enterEmailTip')))
        } else if (!this.$util.isLegalEmail(value)) {
          callback(new Error(this.$t('enterLegalEmailTip')))
        } else {
          callback()
        }
      },

      validatePassword (rule, value, callback) {
        if (!this.isSignUpPage) {
          callback()
          return
        }

        if (!value || value.length <= 0) {
          callback(new Error(this.$t('enterPwdTip')))
        } else if (!this.$util.isLegalPassword(value)) {
          callback(new Error(this.$t('enterLegalPwdTip')))
        } else {
          callback()
        }
      },

      // ----------------------------onClickEvent-----------------------------
      onLoginClick () {
        this.isLoading = true
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            this.$apis.login(this.composeParams()).then(result => {
              // save user-id into vuex-state(& localStorage)
              this.$store.commit('$vuexSetUserInfo', result)

              this.isLoading = false
              this.$router.push('/')
            }).catch(error => {
              this.isLoading = false
              this.setMessageTip(error)
            })
          } else {
            this.isLoading = false
            return false
          }
        })
      },

      onSignupClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            this.isLoading = false
            this.$apis.signup(this.composeParams()).then(result => {
              this.setMessageTip(result, 'success')
            }).catch((error) => {
              this.isLoading = false
              this.setMessageTip(error)
            })
          } else {
            return false
          }
        })
      },

      onForgotPwdClick () {
        this.$router.push('/forgot-pwd')
      },

      onBottomClick () {
        this.$router.push(this.isSignUpPage ? '/login' : '/register')
      },

      onBlurUsername () {
        if (this.isSignUpPage) { this.queryUsername() }
      }
    },

    locales: {
      en: {
        enterUsernameTip: 'Please Enter UserName(Only letters and numbers，3-16)',
        enterLegalUsernameTip: 'Please Enter UserName(Only letters and numbers，3-16)',
        enterEmailTip: 'Please Enter Email',
        enterLegalEmailTip: 'Please Enter A Valid Email Box',
        signupBottomTip: `Don't have an account ?`,
        signinBottomTip: `Already have an account?`
      },
      zh: {
        enterUsernameTip: '请输入用户名(仅限字母和数字，3至16位)',
        enterLegalUsernameTip: '请输入用户名(仅限字母和数字，3至16位)',
        enterEmailTip: '请输入邮箱',
        enterLegalEmailTip: '请输入有效邮箱',
        signupBottomTip: `你已拥有一个账号？`,
        signinBottomTip: `还未拥有一个账号？`
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";

.login-wrap {
  width: 520px;
  margin: 0 auto;
  padding-top: 150px;
  min-height: 400px;
  position: relative;
  .login-bottom-tip{
    font-size: 1.56rem;
    padding: 15px 0;
  }
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
  .nicelinks-logo{
    margin-bottom: 1rem;
  }
  .heading{
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    color: #707473;
  }
  .el-form-item{
    margin-bottom: 30px;
  }
  .el-button{
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .el-input{
    .icons{
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

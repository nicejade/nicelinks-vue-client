<template>
  <div class="login-wrap">
    <div class="login-box">
      <a href="/"><img src="../assets/images/nice_links.png" alt="nice links logo"></a>
      <!-- <h1 class="heading">Nice Links</h1> -->
      <el-form :model="account" :rules="rules" ref="validateForm">
        <el-form-item prop="email">
          <el-input v-model="account.email" placeholder="请输入邮箱"
            @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="login-email"></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password"
            placeholder="密码" @keydown.enter.native="onLoginClick">
            <template slot="prepend"><icon class="icons" name="password"></template>
          </el-input>
        </el-form-item>
        <el-button type="primary" :loading="isLoading"
          @click="onLoginClick" size="large">登录</el-button>
        <el-button :loading="isLoading"
          @click="onSignupClick" size="large">注册</el-button>
        <el-button type="text" :loading="isLoading"
          @click="onForgotPwdClick" size="large">忘记了密码？</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { $apis } from 'helper'
  import sha256 from 'crypto-js/sha256'
  import md5 from 'crypto-js/md5'

  export default{
    data () {
      return {
        isLoading: false,
        account: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'change,blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'change,blur'
            }
          ]
        }
      }
    },

    mounted () {
    },

    components: {
    },

    computed: {
    },

    methods: {
      encryptPwd (str) {
        str = sha256(str).toString()
        str = md5(str).toString()
        return str
      },

      composeParams () {
        return {
          email: this.account.email,
          password: this.encryptPwd(this.account.password)
        }
      },

      // ----------------------------onClickEvent-----------------------------
      onLoginClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            this.isLoading = false
            $apis.login(this.composeParams()).then(result => {
              this.isLoading = false
              this.$router.push('/')
            }).catch(error => {
              this.isLoading = false
              this.$message.error(error)
            })
          } else {
            return false
          }
        })
      },

      onSignupClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            this.isLoading = false
            $apis.signup(this.composeParams()).then(result => {
              this.$message({
                message: result.message,
                type: 'success'
              })
            }).catch((error) => {
              this.isLoading = false
              this.$message.error(`${error}`)
            })
          } else {
            return false
          }
        })
      },

      onForgotPwdClick () {
        this.$router.push('forgot-pwd')
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
}
.login-box {
  width: 520px;
  padding: 30px;
  height: 100%;
  background-color: #fff;
  clear: both;
  display: table;
  border-radius: 3px;
  border: 1px solid #d7dce5;
  .heading{
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    color: #707473;
  }
  img{
    display: block;
    margin: 0 auto 20px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }
  .el-button{
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
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

@media (max-width:320px) {
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

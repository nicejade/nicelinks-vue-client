<template>
  <div class="login-wrap">
    <div class="login-box">
      <img src="../assets/images/nice_links.png" alt="nice links logo">
      <!-- <h1 class="heading">Nice Links</h1> -->
      <el-form :model="account" :rules="rules" ref="validateForm">
        <el-form-item prop="username">
          <el-input v-model="account.username" placeholder="用户名" @keydown.enter.native="onLoginClick"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password" placeholder="密码" @keydown.enter.native="onLoginClick"></el-input>
        </el-form-item>
        <el-button type="primary" :loading="isLoading" @click="onLoginClick" size="large">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { $page } from 'helper'
  export default{
    data () {
      return {
        isLoading: false,
        account: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
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
      onLoginClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.account)
            $page.login(params).then(result => {
            })
          } else {
            return false
          }
        })
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
  .el-button--primary{
    display: block;
    width: 100%;
    margin: 0 auto;
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

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
                <label class="col-sm-3 control-label">{{$t('registeredMailbox')}}:</label>
                <div class="col-sm-9">
                  <el-input placeholder="" v-model="fillForm.email"></el-input>
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
export default{
  name: 'setting',

  components: {
  },

  data () {
    return {
      isLoading: false,
      fillForm: {
        email: ''
      }
    }
  },

  methods: {
    onResetClick () {
      this.$router.push('/')
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

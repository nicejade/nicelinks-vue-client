<template>
  <div class="wrapper" id="setting">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list setting">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('homePage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ $t('accountSetting') }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <div class="form form-horizontal">
                <el-form :model="fillForm" :rules="rules" ref="fillForm">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{$t('setUsername')}}<em>*</em>:</label>
                    <div class="col-sm-9">
                      <el-form-item prop="profile.username">
                        <el-input :disabled="username !== ''" placeholder="" v-model="fillForm.profile.username"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{$t('setNickname')}}<em>*</em>:</label>
                    <div class="col-sm-9">
                      <el-form-item prop="profile.nickname">
                        <el-input placeholder="" v-model="fillForm.profile.nickname"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{$t('personalWebsite')}}<em>*</em>:</label>
                    <div class="col-sm-9">
                      <el-form-item prop="profile.website">
                        <el-input placeholder="" v-model="fillForm.profile.website"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{$t('profile')}}:</label>
                    <div class="col-sm-9">
                      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
                        placeholder="" v-model="fillForm.profile.description"></el-input>
                    </div>
                  </div>
                </el-form>
              </div>

              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9 no-padding">
                  <el-button :loading="isLoading" type="primary" @click='onSaveClick'>{{$t('saveSeting')}}</el-button>
                </div>
              </div>
              <el-alert
                v-if="tipMessageObj.message"
                :title="tipMessageObj.message"
                :type="tipMessageObj.type">
              </el-alert>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo, setUserInfo} from 'service/index'

export default{
  name: 'Setting',

  components: {
  },

  data () {
    return {
      tipMessageObj: {},
      isLoading: false,
      fillForm: {
        _id: '',
        email: '',
        profile: {
          username: '',
          nickname: '',
          website: '',
          description: ''
        }
      },
      username: '',
      rules: {
        'profile.username': [
          { required: true, message: this.$t('pleaseEnter'), trigger: 'change,blur' }
        ],
        'profile.nickname': [
          { required: true, message: this.$t('pleaseEnter'), trigger: 'change,blur' }
        ],
        'profile.website': [
          { required: true, validator: this.$verifyUrl, trigger: 'change,blur' }
        ]
      }
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      let params = {_id: window.localStorage.getItem('NiceLinksUserId')}
      getUserInfo(params).then(result => {
        this.username = result.value.profile.username
        Object.assign(this.fillForm, result.value)
      })
    },
    tip (message, type) {
      let vm = this
      vm.tipMessageObj = {
        message: message,
        type: type
      }
      setTimeout(function () {
        vm.tipMessageObj = {}
      }, 2000)
    },
    onSaveClick () {
      this.$refs['fillForm'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          let params = this.fillForm
          setUserInfo(params).then(result => {
            this.isLoading = false
            this.tip(result.message, 'success')
            this.init()
          }).catch(error => {
            this.tip(error, 'error')
            this.isLoading = false
          })
        } else {
          return false
        }
      })
    }
  },

  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>

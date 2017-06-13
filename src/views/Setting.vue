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
                    <label class="col-sm-3 control-label">{{$t('setNickname')}}:</label>
                    <div class="col-sm-9">
                      <el-input placeholder="" v-model="fillForm.nickname"></el-input>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{$t('personalWebsite')}}:</label>
                    <div class="col-sm-9">
                      <el-input placeholder="" v-model="fillForm.website"></el-input>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{$t('profile')}}:</label>
                    <div class="col-sm-9">
                      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
                        placeholder="" v-model="fillForm.profile"></el-input>
                    </div>
                  </div>
                </el-form>
              </div>

              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9 no-padding">
                  <el-button type="primary" @click='onSaveClick'>{{$t('saveSeting')}}</el-button>
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
  name: 'Setting',

  components: {
  },

  data () {
    return {
      isLoading: false,
      fillForm: {
        nickname: '',
        website: '',
        profile: ''
      },
      rules: {}
    }
  },

  methods: {
    onSaveClick () {
      console.log('xx')
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


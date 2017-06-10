<template>
  <div class="wrapper" id="setting">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list setting">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h4>{{ $t('accountSetting') }}</h4>
              </div>
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
              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
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
  name: 'setting',

  components: {
  },

  data () {
    return {
      isLoading: false,
      fillForm: {
        nickname: '',
        website: '',
        profile: ''
      }
    }
  },

  methods: {
    onSaveClick () {}
  },

  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>

<style type="text/css" lang="scss">
.box-card{
  .form-group{
    width: 100%;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .el-input, .el-textarea{
    max-width: 300px;
  }
}
</style>

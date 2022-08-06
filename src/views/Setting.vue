<template>
  <div class="wrapper" id="setting">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list setting">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('firstPage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ $t('accountSetting') }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <div class="form form-horizontal">
                <el-form :model="fillForm" :rules="rules" ref="fillForm">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{ $t('setUsername') }}<em>*</em>:</label>
                    <div class="col-sm-9">
                      <el-input
                        placeholder=""
                        :disabled="true"
                        v-model="fillForm.username"
                      ></el-input>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{ $t('setNickname') }}:</label>
                    <div class="col-sm-9">
                      <el-form-item prop="profile.nickname">
                        <el-input placeholder="" v-model="fillForm.profile.nickname"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{ $t('personalWebsite') }}:</label>
                    <div class="col-sm-9">
                      <el-form-item prop="profile.website">
                        <el-input placeholder="" v-model="fillForm.profile.website"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">{{ $t('profile') }}:</label>
                    <div class="col-sm-9">
                      <markdown v-model="fillForm.profile.description" />
                    </div>
                  </div>
                </el-form>
              </div>

              <div class="form-group operation-area">
                <el-button :loading="isLoading" type="primary" @click="onSaveClick">{{
                  $t('saveSeting')
                }}</el-button>
              </div>
              <el-alert
                v-if="tipMessageObj.message"
                :title="tipMessageObj.message"
                :type="tipMessageObj.type"
              >
              </el-alert>

              <hr />

              <div class="form-group">
                <div class="update-avatar-area">
                  <img class="preview-avatar" :src="imgDataUrl" :alt="$t('niceLinksStr')" />
                  <br />
                  <el-button :loading="isLoading" type="text" @click="onUpdateAvatarClick">
                    {{ $t('updateAvatar') }}
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
    <upload-avatar
      field="image"
      @crop-success="onCropSuccess"
      @crop-upload-success="onCropUploadSuccess"
      @crop-upload-fail="onCropUploadFail"
      v-model="isShowUploadAvatar"
      :width="100"
      :height="100"
      url="/api/uploadAvatar"
      :params="params"
      :headers="headers"
      img-format="png"
    >
    </upload-avatar>
  </div>
</template>

<script>
import UploadAvatar from 'components/UploadAvatar'
import Markdown from 'components/markdown/Index'

export default {
  name: 'Setting',

  mixins: [],

  components: {
    UploadAvatar,
    Markdown,
  },

  data() {
    return {
      tipMessageObj: {},
      isLoading: false,
      fillForm: {
        _id: '',
        email: '',
        username: '',
        profile: {
          nickname: '',
          website: '',
          description: '',
        },
      },
      rules: {
        'profile.nickname': [
          { required: false, validator: this.isTheLegalNick, trigger: 'change,blur' },
        ],
        'profile.website': [
          { required: false, validator: this.isTheLegalUrl, trigger: 'change,blur' },
        ],
      },
      isShowUploadAvatar: false,
      params: {
        token: '131421',
        name: 'avatar',
      },
      headers: {
        imgname: '',
        username: '',
      },
      imgDataUrl: 'https://image.nicelinks.site/default-avatar.jpeg',
    }
  },

  mounted() {
    this.$setPageTitle('设置')
    this.initFetch()
  },

  methods: {
    initFetch() {
      const userInfoId = this.userInfo._id
      this.$apis
        .getProfile({ _id: userInfoId })
        .then((result) => {
          Object.assign(this.fillForm, result)
          let currentDateStr = new Date(this.$util.getCurrentDate()).Format('yyyy-MM-dd')
          let currentTimeHMS = this.$util.getCurrentDateHMS()
          if (result.profile.avatar) {
            this.imgDataUrl = `/api/avatar/${result.profile.avatar}`
          }

          this.headers.imgname = [currentDateStr, currentTimeHMS, userInfoId].join('-')
          this.headers.username = this.userInfo.username || ''
        })
        .catch((error) => {
          this.errorAlertTip(`Err: ${error}`, 'error')
          this.isLoading = false
        })
    },

    errorAlertTip(message, type) {
      this.tipMessageObj = {
        message: message,
        type: type,
      }
      setTimeout(() => {
        this.tipMessageObj = {}
      }, 2000)
    },

    isTheLegalNick(rule, value, callback) {
      if (value && !this.$util.isLegalNick(value)) {
        callback(new Error(this.$t('enterLegalNick')))
      } else {
        callback()
      }
    },

    isTheLegalUrl(rule, value, callback) {
      if (value && !this.$util.isLegalUrl(value)) {
        callback(new Error(this.$t('enterLegalUrl')))
      } else {
        callback()
      }
    },

    onSaveClick() {
      this.$gtagTracking('save-setting', 'setting', 'save-setting')
      this.$refs['fillForm'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          let params = this.$_.cloneDeep(this.fillForm)
          delete params.username
          this.$apis
            .setProfile(params)
            .then((result) => {
              this.$message({
                message: result,
                type: 'success',
              })

              // ReUpdate UserInfo
              this.$getUserInfo()
            })
            .catch((error) => {
              this.errorAlertTip(error, 'error')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      })
    },

    onUpdateAvatarClick() {
      this.$gtagTracking('update-avatar', 'setting', 'update-avatar')
      this.isShowUploadAvatar = true
    },

    onCropSuccess(imgPath) {
      this.imgDataUrl = imgPath
    },

    onCropUploadFail() {
      console.log('Upload Avatar Fail.')
    },

    onCropUploadSuccess(imgPath) {
      this.imgDataUrl = `/api/avatar/${imgPath}`
      // ReUpdate UserInfo
      this.$getUserInfo()
      this.isShowUploadAvatar = false
    },
  },

  locales: {
    zh: {
      enterLegalNick: '请输入 3 ～ 15 位任意字符',
    },
  },
}
</script>

<style lang="scss">
.update-avatar-area {
  width: 100%;
  text-align: center;
  margin: auto;
  margin-top: 25px;
  .preview-avatar {
    width: 100px;
    height: 100px;
    border: 1px solid #d1dbe5;
    border-radius: 50%;
  }
}

.setting {
  .form-group {
    .el-input,
    .el-textarea {
      max-width: 768px;
      width: 100%;
    }
  }
  .operation-area {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .setting {
    .form-horizontal {
      .form-group {
        margin-left: 0px;
        margin-right: 0px;
      }
    }
    .operation-area {
      margin-left: 15px;
    }
  }
}
</style>

<template>
  <div class="sentences-dialog">
    <el-dialog
      stripe
      :title="$t('shareNewSentences')"
      :visible.sync="isShowDlgFlag"
      size="small"
      v-loading.body="isLoading"
    >
      <div class="form form-horizontal">
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('type') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="type">
                <el-select
                  class="wrap-block"
                  v-model="fillForm.type"
                  :placeholder="this.$t('pleaseSelect') + this.$t('type')"
                >
                  <el-option
                    v-for="item in sentencesTypeList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('content') }} ：</label>
            <div class="col-sm-8">
              <markdown
                v-model="fillForm.content"
                :placeholder="this.$t('pleaseSelect') + this.$t('content')"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('isAcive') }} ：</label>
            <div class="col-sm-8">
              <el-switch
                :on-text="$t('yes')"
                :off-text="$t('no')"
                v-model="fillForm.active"
                on-color="#13ce66"
                off-color="#ff4949"
              >
              </el-switch>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDlgFlag = false">{{ this.$t('cancel') }}</el-button>
        <el-button type="primary" @click="onCommitClick">{{ this.$t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SENTENCES_CONF from './../../config/sentences'
import Markdown from 'components/markdown/Index'

export default {
  name: 'EditDialog',

  data() {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      sentencesTypeList: Object.freeze(SENTENCES_CONF),
      fillForm: {
        type: '',
        content: '',
        active: false,
      },
      rules: {
        content: [
          {
            required: true,
            message: this.$t('pleaseEnter') + this.$t('linkNameStr'),
            trigger: 'change,blur',
          },
        ],
        type: [
          {
            required: true,
            message: this.$t('pleaseSelect') + this.$t('type'),
            trigger: 'change,blur',
          },
        ],
      },
    }
  },

  components: {
    Markdown,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    pdata: {
      type: Object,
      default: {},
    },
  },

  watch: {
    value(val) {
      this.isShowDlgFlag = val
    },
    isShowDlgFlag(val) {
      if (!val) {
        this.fillForm = {
          type: '',
          content: '',
          active: false,
        }
      }
      this.$emit('input', val)
    },
    pdata(val) {
      this.fillForm = this.$cloneDeep(val)
    },
  },

  methods: {
    onCommitClick() {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          this.isLoading = true

          let params = this.$cloneDeep(this.fillForm, true)
          // 其基本信息不能改变，只是加上管理者 Id & Role @17-10-02；
          params.managerId = this.userInfo && this.userInfo._id
          params.createdBy = this.userInfo && this.userInfo.username
          params.managerRole = this.userInfo && this.userInfo.role

          this.$apis
            .updateSentences(params)
            .then((result) => {
              this.isLoading = false
              this.isShowDlgFlag = false
              this.$message({
                message: '干的漂亮，您已成功更新该箴言',
                type: 'success',
              })
              this.$emit('update-success')
            })
            .catch((error) => {
              console.log(error)
              this.isLoading = false
              this.$message.error(`${error}`)
            })
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
.sentences-dialog {
  .form-group {
    .control-label {
      font-weight: normal;
      padding: 1rem 0;

      em {
        color: $red;
        padding-right: 3px;
      }
    }
  }
}
</style>

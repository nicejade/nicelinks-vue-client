<template>
  <div id="edit-dialog">
    <el-dialog stripe :title="$t('shareNewLink')" :visible.sync="isShowDlgFlag" v-if="isShowDlgFlag" size="small"
      v-loading.body="isLoading">
      <div class="form form-horizontal">
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group">
            <el-form-item prop="urlPath">
              <el-input v-model="fillForm.urlPath" :placeholder="this.$t('pleaseEnter') + this.$t('linkAddressStr')">
              </el-input>
            </el-form-item>
          </div>
          <div class="form-group">
            <el-form-item prop="title">
              <el-input v-model="fillForm.title" :placeholder="this.$t('pleaseEnter') + this.$t('linkNameStr')">
              </el-input>
            </el-form-item>
          </div>

          <div class="form-group">
            <el-form-item prop="classify">
              <el-select class="wrap-block" v-model="fillForm.classify"
                :placeholder="this.$t('pleaseSelect') + this.$t('linkClassifyStr')">
                <el-option v-for="item in classifyList" :key="item.key" :label="$t(item.name)" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="form-group">
            <div class="col-sm-8">
              <el-form-item prop="theme">
                <el-select class="wrap-block" v-model="fillForm.theme"
                  :placeholder="this.$t('pleaseSelect') + this.$t('linkThemeStr')">
                  <el-option v-for="item in themeList" :key="item.key" :label="item.key" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <el-form-item prop="tags">
              <el-select class="wrap-block" v-model="fillForm.tags" allow-create multiple filterable :multiple-limit="3"
                :placeholder="this.$t('pleaseSelect') + this.$t('linkTagsStr')">
                <el-option v-for="item in tagsList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="form-group">
            <el-form-item prop="keywords">
              <el-input type="textarea" :maxlength="360" :autosize="{ minRows: 2, maxRows: 10 }"
                :placeholder="this.$t('pleaseSelect') + this.$t('linkKeywordStr')" v-model="fillForm.keywords">
              </el-input>
            </el-form-item>
          </div>

          <div class="form-group">
            <el-form-item prop="desc">
              <el-input type="textarea" :maxlength="360" :autosize="{ minRows: 3, maxRows: 10 }"
                :placeholder="this.$t('pleaseSelect') + this.$t('linkDescStr')" v-model="fillForm.desc">
              </el-input>
            </el-form-item>
          </div>

          <div class="form-group">
            <markdown v-model="fillForm.review" :placeholder="this.$t('pleaseSelect') + this.$t('linkReviewStr')" />
          </div>

          <div class="form-group">
            <label class="control-label"> {{ this.$t('isAcive') }} ：</label>
            <el-switch :on-text="$t('yes')" :off-text="$t('no')" v-model="fillForm.active" on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </div>

          <div class="form-group">
            <label class="control-label"> {{ this.$t('isAlive') }} ：</label>
            <el-switch :on-text="$t('yes')" :off-text="$t('no')" v-model="fillForm.alive" on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </div>

          <div class="form-group">
            <label class="control-label"> {{ this.$t('isRecommend') }} ：</label>
            <el-switch :on-text="$t('yes')" :off-text="$t('no')" v-model="fillForm.recommend" on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
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
import CLASSIFY_CONF from './../../config/classify'
import THEME_CONF from './../../config/theme'
import TAG_CONF from './../../config/tags'
import Markdown from 'components/markdown/Index'

export default {
  name: 'EditDialog',

  data() {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      fillForm: {
        urlPath: '',
        title: '',
        desc: '',
        classify: '',
        theme: '',
        tags: [],
        review: '',
        alive: true,
        active: false,
        recommend: false
      },
      themeList: [],
      tagsList: TAG_CONF,
      classifyList: CLASSIFY_CONF,
      rules: {
        urlPath: [{ required: true, validator: this.$verifyUrl, trigger: 'change,blur' }],
        title: [
          {
            required: true,
            message: this.$t('pleaseEnter') + this.$t('linkNameStr'),
            trigger: 'change,blur',
          },
        ],
        theme: [
          {
            required: true,
            message: this.$t('pleaseSelect') + this.$t('linkThemeStr'),
            trigger: 'change,blur',
          },
        ],
        classify: [
          {
            required: true,
            message: this.$t('pleaseSelect') + this.$t('linkClassifyStr'),
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
      this.$emit('input', val)
    },
    'fillForm.classify': function (val) {
      this.themeList = THEME_CONF[this.fillForm.classify] || []
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
          params.managerRole = this.userInfo && this.userInfo.role

          this.$apis
            .updateNiceLinks(params)
            .then((result) => {
              this.isLoading = false
              this.isShowDlgFlag = false
              this.$message({
                message: '干的漂亮，您已成功修改该链接',
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

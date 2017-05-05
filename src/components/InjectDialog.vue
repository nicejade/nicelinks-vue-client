<template>
  <div id="inject-links">
    <el-dialog stripe :title="$t('injectLinks')"
      v-model="isShowDlgFlag" size="small" v-loading.body="isLoading">
      <div class="form form-horizontal">
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkAddressStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="url_path">
                <el-input
                  v-model="fillForm.url_path"
                  :placeholder="this.$t('pleaseEnter') + this.$t('linkAddressStr')"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkNameStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="title">
                <el-input
                  v-model="fillForm.title"
                  :placeholder="this.$t('pleaseEnter') + this.$t('linkNameStr')"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkClassifyStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="classify">
                <el-select class="wrap-block" v-model="fillForm.classify"
                  :placeholder="this.$t('pleaseSelect') + this.$t('linkClassifyStr')">
                  <el-option
                    v-for="item in classifyList"
                    :label="item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkTagsStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="tagsArr">
                <el-select class="wrap-block" v-model="fillForm.tagsArr" multiple :multiple-limit="3"
                  :placeholder="this.$t('pleaseSelect') + this.$t('linkTagsStr')">
                  <el-option
                    v-for="item in tagsList"
                    :label="item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ this.$t('linkDescStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="desc">
                <el-input :placeholder="this.$t('pleaseSelect') + this.$t('linkDescStr')" v-model="fillForm.desc"></el-input>
              </el-form-item>
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
import { $apis } from 'helper'
import { $config } from 'config'
import _ from 'lodash'

export default {
  data () {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      fillForm: {
        url_path: '',
        title: '',
        desc: '',
        classify: '',
        tagsArr: [],
        tags: ''
      },
      classifyList: $config.classify,
      rules: {
        url_path: [
          { required: true, validator: this.$verifyUrl, trigger: 'change,blur' }
        ],
        title: [
          { required: true, message: this.$t('pleaseEnter') + this.$t('linkNameStr'), trigger: 'change,blur' }
        ],
        classify: [
          { required: true, message: this.$t('pleaseSelect') + this.$t('linkClassifyStr'), trigger: 'change,blur' }
        ]
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    tagsList () {
      return $config.tags[this.fillForm.classify]
    }
  },

  watch: {
    value (val) {
      this.isShowDlgFlag = val
    },
    isShowDlgFlag (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    onCommitClick () {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.fillForm.tags = this.fillForm.tagsArr.join(';')

          let params = _.clone(this.fillForm, true)
          delete params.tagsArr

          $apis.addNiceLinks(params).then(result => {
            this.isLoading = false
            this.isShowDlgFlag = false
            this.$message({
              message: '很好，你已成功添加该链接',
              type: 'success'
            })
            this.$bus.emit('inject-success')
          }).catch((error) => {
            console.log(error)
            this.isLoading = false
            this.$message.error(`${error}`)
          })
        }
      })
    }
  }
}
</script>

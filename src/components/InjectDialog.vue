<template>
  <div id="inject-links">
    <el-dialog stripe :title="$t('injectLinks')"
      v-model="isShowDlgFlag" size="small" v-loading.body="isLoading">
      <div class="form form-horizontal">
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group">
            <label class="col-sm-3 control-label"> 博客地址 <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="url_path">
                <el-input placeholder="请输入博客地址" v-model="fillForm.url_path"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> 博客名称 <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="title">
                <el-input placeholder="请输入博客名称" v-model="fillForm.title"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> 选择分类 <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="classify">
                <el-select v-model="fillForm.classify" placeholder="请选择分类">
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
            <label class="col-sm-3 control-label"> 选择标签 <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="tagsArr">
                <el-select v-model="fillForm.tagsArr" placeholder="请选择标签" multiple>
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
            <label class="col-sm-3 control-label"> 博客描述 <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="desc">
                <el-input placeholder="请输入博客描述" v-model="fillForm.desc"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDlgFlag = false">取 消</el-button>
        <el-button type="primary" @click="onCommitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { $apis } from 'helper'
import { $config } from 'config'

export default {
  data () {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      fillForm: {
        url_path: 'jeffjade.com',
        title: '晚晴幽草轩',
        desc: '追求极致、极客',
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
          { required: true, message: '请输入链接名称', trigger: 'change,blur' }
        ],
        classify: [
          { required: true, message: '请选择分类', trigger: 'change,blur' }
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
          $apis.addNiceLinks(this.fillForm).then(result => {
            this.isLoading = false
            this.isShowDlgFlag = false
            this.$message({
              message: '很好，你已成功添加该链接',
              type: 'success'
            })
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

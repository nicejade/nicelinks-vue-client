<template>
  <div id="inject-blog">
    <el-button type="info" @click="isShowDlgFlag = true">注入新博客</el-button>

    <el-dialog stripe title="注入新博客" v-model="isShowDlgFlag" size="small" v-loading.body="isLoading">
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
          <label class="col-sm-3 control-label"> 博客描述 <em>*</em>：</label>
          <div class="col-sm-8">
            <el-form-item prop="desc">
              <el-input placeholder="请输入博客描述" v-model="fillForm.desc"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label"> 选择标签 <em>*</em>：</label>
          <div class="col-sm-8">
            <el-form-item prop="tags">
              <el-input placeholder="请选择标签" v-model="fillForm.tags"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDlgFlag = false">取 消</el-button>
        <el-button type="primary" @click="onCommitClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { $apis } from 'helper'
export default {
  data () {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      fillForm: {
        url_path: 'jeffjade.com',
        title: '晚晴幽草轩',
        desc: '追求极致、极客',
        tags: '前端'
      },
      rules: {
        url_path: [
          { required: true, validator: this.$verifyUrl, trigger: 'change,blur' }
        ],
        title: [
          { required: true, message: '请输入博客名称', trigger: 'change,blur' }
        ]
      }
    }
  },

  methods: {
    onCommitClick () {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          $apis.addNewBlog(this.fillForm).then(result => {
            console.log(result)
            this.isLoading = false
            this.isShowDlgFlag = false
            this.$notify({
              title: '温馨提示',
              message: '很好，你已成功添加该博客',
              type: 'success'
            })
          }).catch((error) => {
            this.isLoading = false
            this.$notify({
              title: '温馨提示',
              message: `${error}`,
              type: 'error'
            })
          })
        }
      })
    }
  }
}
</script>

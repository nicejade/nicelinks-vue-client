<template>
  <div id="share-link" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <h3 class="share-title">{{ $t('shareNewLink') }}</h3>
            <section class="form form-horizontal">
              <el-form :model="fillForm" :rules="rules" ref="fillForm">
                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="urlPath">
                      <el-input
                        v-model="fillForm.urlPath"
                        @blur="getLinkPageData"
                        :placeholder="$t('pleaseEnter') + $t('linkAddressStr')"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="title">
                      <el-input
                        v-model="fillForm.title"
                        :placeholder="$t('pleaseEnter') + $t('linkNameStr')"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="classify">
                      <el-select
                        class="wrap-block"
                        v-model="fillForm.classify"
                        :placeholder="$t('pleaseSelect') + $t('linkClassifyStr')"
                      >
                        <el-option
                          v-for="item in classifyList"
                          :key="item.value"
                          :label="$t(item.name)"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="theme">
                      <el-select
                        class="wrap-block"
                        v-model="fillForm.theme"
                        :placeholder="$t('pleaseSelect') + $t('linkThemeStr')"
                      >
                        <el-option
                          v-for="item in themeList"
                          :key="item.key"
                          :label="item.key"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="tags">
                      <el-select
                        class="wrap-block"
                        v-model="fillForm.tags"
                        allow-create
                        multiple
                        filterable
                        :multiple-limit="3"
                        :placeholder="$t('pleaseSelect') + $t('linkTagsStr')"
                      >
                        <el-option
                          v-for="(item, index) in tagsList"
                          :key="index"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="keywords">
                      <el-input
                        type="textarea"
                        :maxlength="360"
                        :autosize="{ minRows: 3, maxRows: 10 }"
                        :placeholder="$t('linkKeywordStr')"
                        v-model="fillForm.keywords"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="desc">
                      <el-input
                        type="textarea"
                        :maxlength="360"
                        :autosize="{ minRows: 5, maxRows: 10 }"
                        :placeholder="$t('linkDescStr')"
                        v-model="fillForm.desc"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-12">
                    <el-form-item prop="review">
                      <markdown v-model="fillForm.review" :placeholder="$t('linkReviewStr')" />
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <p class="tip">
                <strong>备注</strong
                >：倾城仅收录网站（拥有域名），而非某网站麾下具体链接，详情可参见
                <a href="https://nicelinks.site/about" target="_blank">关于倾城 </a>。
              </p>
            </section>
            <div class="operate-area">
              <el-button @click="onResetClick">
                {{ this.$t('reset') }}
              </el-button>
              <el-button type="primary" @click="onPublishClick">
                {{ this.$t('publish') }}
              </el-button>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import endsWith from 'lodash/endsWith'

import CLASSIFY_CONF from './../../config/classify'
import THEME_CONF from './../../config/theme'
import TAG_CONF from './../../config/tags'
import Markdown from 'components/markdown/Index'

export default {
  name: 'ShareLink',

  data() {
    return {
      isLoading: false,
      fillForm: {
        urlPath: '',
        title: '',
        desc: '',
        keywords: '',
        classify: '',
        theme: '',
        tags: [],
        review: '',
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

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Markdown,
  },

  watch: {
    'fillForm.classify': function (val) {
      this.themeList = THEME_CONF[this.fillForm.classify] || []
    },
  },

  mounted() {
    this.$setPageTitle(this.$t('shareNewLink'))
  },

  methods: {
    getLinkPageData() {
      if (!this.fillForm.urlPath) return

      // 如填写的路径，未以 "/" 结尾，则为其加上(@18-01-27)
      if (!endsWith(this.fillForm.urlPath, '/')) {
        this.fillForm.urlPath += '/'
      }

      this.$apis
        .crawlLinksInfo({ url: this.fillForm.urlPath })
        .then((result) => {
          this.fillForm.title = result.title
          this.fillForm.desc = result.desc
          this.fillForm.keywords = result.keywords
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
    },

    resetForm() {
      this.$refs['fillForm'].resetFields()
    },

    removeTagsSpaceChar() {
      if (!this.fillForm.tags.length) {
        return
      }
      this.fillForm.tags = this.fillForm.tags.map((item) => {
        return item.replace(/\s/g, '')
      })
    },

    onResetClick() {
      this.resetForm()
    },

    onPublishClick() {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          this.isLoading = true

          // 遍历 Tags 数组，移除 tag 中空格字符，以免发生不匹配问题；
          this.removeTagsSpaceChar()
          let params = this.$cloneDeep(this.fillForm, true)
          params.userId = this.userInfo && this.userInfo._id
          params.role = this.userInfo && this.userInfo.role
          params.createdBy = this.userInfo && this.userInfo.username

          this.$apis
            .addNiceLinks(params)
            .then((result) => {
              this.isLoading = false
              this.$message({
                message: '很好，您已成功添加该链接，正在待审核中.',
                type: 'success',
              })
              this.resetForm()
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

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.entry-list {
  padding: 0 3rem;

  .share-title {
    padding: 2rem 0;
    text-align: left;
    font-weight: 700;
  }

  .operate-area {
    padding-bottom: 40px;
  }
  .tip {
    margin: 2rem auto;
    text-align: left;
    color: $silver-grey;
  }
}

@media screen and (max-width: $small-mobile-screen) {
  .entry-list {
    padding: 0 20px;

    .share-title {
      padding: 20px 0;
    }
  }
}
</style>

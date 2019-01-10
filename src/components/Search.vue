<template>
  <el-autocomplete
    popper-class="search-autocomplete"
    placement="bottom-start"
    :select-when-unmatched="isSelectWhenUnmatched"
    :trigger-on-focus="isTriggerFocus"
    :popper-append-to-body="isPopperToBody"
    v-model="keyword"
    :fetch-suggestions="handleFetchNiceLinks"
    :placeholder="$t('searchYourWant')"
    @select="handleSearchSelect"
    @focus="handleSearchFocus"
    @blur="handleSearchBlur">
    <i
      class="el-icon-search el-input__icon"
      slot="suffix"
      @click="handleIconClick">
    </i>
    <template slot-scope="{ item }">
      <p class="item-title" v-html="styleForTitle(item)"></p>
      <div class="item-desc" v-html="styleForDesc(item)"></div>
    </template>
  </el-autocomplete>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      keywordBackup: '',
      isSelectWhenUnmatched: true,
      isTriggerFocus: true,
      isPopperToBody: true
    }
  },

  props: {
  },

  computed: {
  },

  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    handleFetchNiceLinks (queryString, callback) {
      this.keywordBackup = queryString
      if (queryString === '' && queryString.trim() === '') {
        const defSize = this.$isMobileScreen() ? 8 : 16
        return this.$apis.getRandomLinks({ size: defSize }).then(result => {
          callback(result)
        }).catch(error => {
          this.$message.error(`${error}`)
        })
      }

      const params = {
        keyword: queryString
      }
      this.$apis.searchNiceLinks(params).then(result => {
        callback(result)
      }).catch(error => {
        this.$message.error(`${error}`)
      })
    },

    handleSearchSelect (item) {
      if (!item || !item._id) return
      const keyword = this.keywordBackup || 'srandom'
      const stype = item.stype || 'srandom'
      const paramStr = `?keyword=${keyword}&type=${stype}`
      this.$router.push(`/post/${item._id}${paramStr}`)
    },

    handleIconClick () {
    },

    handleSearchFocus () {
      if (this.$isMobileScreen()) {
        if (this.$util.isAndroidSystem()) {
          document.querySelector('.search-autocomplete').style.display = 'none'
          setTimeout(() => {
            // this.$nextTick(() => {})
            document.querySelector('.search-autocomplete').style.display = 'block'
            document.querySelector('.search-autocomplete').style.top = '110px'
          }, 360)
        }
        return
      }
      const expandedWidth = window.innerWidth > 1280 ? 666 : 521
      document.querySelector('.el-input__inner').style.width = `${expandedWidth}px`
    },

    handleSearchBlur () {
      if (this.$isMobileScreen()) return
      document.querySelector('.el-input__inner').style.width = '221px'
    },

    styleForTitle (item) {
      return item.title.replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    },

    styleForDesc (item) {
      const tempDesc = (item && item.stype)
        ? item[item.stype]
        : item.review || item.desc
      let niceDesc = marked(tempDesc, {
        sanitize: true
      })
      niceDesc = this.$util.filterHtmlTag(niceDesc)
      niceDesc = this.$util.sliceToAheadTarget(niceDesc, this.keyword)
      return niceDesc.replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    }
  },

  locales: {
    zh: {
    },
    en: {
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";

.el-autocomplete-suggestion {
  .el-scrollbar {
    .el-autocomplete-suggestion__wrap {
      height: 539px;
      min-height: 539px;
    }
    .el-autocomplete-suggestion__list li {
      border-bottom: 1px dashed $border-grey;
    }
  }
}

@media (min-width: $large-screen) {
  .el-autocomplete-suggestion {
    .el-scrollbar {
      .el-autocomplete-suggestion__wrap {
        height: 677px;
        min-height: 677px;
      }
    }
  }
}
@media screen and (max-width: $mobile-screen) {
  .el-autocomplete-suggestion {
    top: 110px !important;
    .el-scrollbar {
      .el-autocomplete-suggestion__wrap {
        height: 34rem;
        min-height: 34rem;
      }
    }
  }
}
@media screen and (max-width: $tiny-mobile-screen) {
  .el-autocomplete-suggestion {
    top: 110px !important;
    .el-scrollbar {
      .el-autocomplete-suggestion__wrap {
        height: 28.6rem;
        min-height: 28.6rem;
      }
    }
  }
}

.search-autocomplete .el-autocomplete-suggestion__wrap{
  li {
    padding: 0 15px;
    line-height: 18px;
    .item-title {
      font-size: $font-medium;
      color: $black;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 18px;
      padding-top: 10px;
    }
    .item-desc {
      display: inline-block;
      line-height: 18px;
      padding-top: 5px;
      padding-bottom: 10px;
      color: $silver-grey;
      font-size: $font-small;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.el-autocomplete .el-input--suffix .el-input__inner {
  width: 100%;
  border-radius: 20px;
}
.keyword {
  font-style: normal;
  color: $brand;
  text-decoration: underline;
}
</style>

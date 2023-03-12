<template>
  <el-autocomplete
    id="search-nice"
    popper-class="search-autocomplete"
    placement="bottom-start"
    :select-when-unmatched="isSelectWhenUnmatched"
    :trigger-on-focus="isTriggerFocus"
    :popper-append-to-body="isPopperToBody"
    v-model="keyword"
    :fetch-suggestions="handleFetchNiceLinks"
    placeholder="搜您想要，探索美好"
    @select="handleSearchSelect"
    @focus="handleSearchFocus"
    @blur="handleSearchBlur"
  >
    <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"> </i>
    <template slot-scope="{ item }">
      <p class="item-title" v-html="styleForTitle(item)"></p>
      <div class="item-desc" v-html="styleForDesc(item)"></div>
    </template>
  </el-autocomplete>
</template>

<script>
import Vue from 'vue'
import { Autocomplete } from 'element-ui'
import 'element-ui/lib/theme-chalk/autocomplete.css'
import debounce from 'lodash/debounce'
import { parse } from './../helper/marked'
import { filterHtmlTag, sliceToAheadTarget } from './../helper/tool'
import { isAndroidSystem } from './../helper/system'

Vue.use(Autocomplete)

export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      keywordBackup: '',
      isSelectWhenUnmatched: true,
      isTriggerFocus: true,
      isPopperToBody: true,
    }
  },

  methods: {
    requestSearchTarget(queryString, callback) {
      return debounce(() => {
        this.$apis
          .searchNiceLinks({
            keyword: queryString,
          })
          .then((result) => {
            callback(result)
          })
          .catch((error) => {
            this.$message.error(`${error}`)
          })
      }, 500)
    },

    handleFetchNiceLinks(queryString, callback) {
      this.keywordBackup = queryString
      if (queryString === '' && queryString.trim() === '') {
        const defSize = this.$isMobile ? 8 : 16
        return this.$apis
          .getRandomLinks({ size: defSize })
          .then((result) => {
            callback(result)
          })
          .catch((error) => {
            this.$message.error(`${error}`)
          })
      }
      // 增加防抖功效，提升检索体验 @2022.03.16
      this.requestSearchTarget(queryString, callback)()
    },

    handleSearchSelect(item) {
      if (!item || !item._id) return
      const keyword = this.keywordBackup || 'srandom'
      const stype = item.stype || 'srandom'
      const paramStr = `?keyword=${keyword}&type=${stype}`
      this.$router.push(`/post/${item._id}${paramStr}`)
    },

    handleIconClick() {},

    handleSearchFocus() {
      if (this.$isMobile) {
        if (isAndroidSystem()) {
          document.querySelector('.search-autocomplete').style.display = 'none'
          setTimeout(() => {
            document.querySelector('.search-autocomplete').style.display = 'block'
            document.querySelector('.search-autocomplete').style.top = '110px'
          }, 360)
        }
        return
      }
      const expandedWidth = window.innerWidth > 1560 ? 666 : 521
      document.querySelector('.el-input__inner').style.width = `${expandedWidth}px`
    },

    handleSearchBlur() {
      if (this.$isMobile) return
      document.querySelector('.el-input__inner').style.width = '221px'
    },

    styleForTitle(item) {
      return item.title.replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    },

    styleForDesc(item) {
      const tempDesc = item && item.stype ? item[item.stype] : item.review || item.desc
      let niceDesc = parse(tempDesc)
      niceDesc = filterHtmlTag(niceDesc)
      niceDesc = sliceToAheadTarget(niceDesc, this.keyword)
      return niceDesc.replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.el-autocomplete-suggestion {
  .el-scrollbar {
    .el-autocomplete-suggestion__wrap {
      height: 49rem;
      min-height: 49rem;
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
        height: 618px;
        min-height: 618px;
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

.search-autocomplete .el-autocomplete-suggestion__wrap {
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
  font-size: $font-small;
  width: 100%;
  border-radius: 20px;
}

.keyword {
  font-style: normal;
  color: $brand;
  text-decoration: underline;
}

#search-nice.search-extra-class {
  top: 0px;
  opacity: 0;
  animation-name: search-up-hide;
  animation-fill-mode: both;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
}

@keyframes search-up-hide {
  0% {
    top: 60px;
  }

  100% {
    display: none;
  }
}

.sub-head-follow {
  top: 60px;
  animation-name: sub-head-up;
  animation-fill-mode: both;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
}

@keyframes sub-head-up {
  0% {
    top: 110px;
  }

  100% {
    top: 60px;
  }
}
</style>

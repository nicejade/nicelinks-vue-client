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
import marked from 'marked'
import throttle from 'lodash/throttle'

import $document from './../helper/document'
import { filterHtmlTag, sliceToAheadTarget } from './../helper/tool'
import { isAndroidSystem, isIosSystem } from './../helper/system'

export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      keywordBackup: '',
      isSelectWhenUnmatched: true,
      isTriggerFocus: true,
      isPopperToBody: true,
      startPageY: 0,
      startPageX: 0,
    }
  },

  props: {},

  computed: {},

  components: {},

  created() {},

  mounted() {
    this.switchSerachShowHide()
  },

  methods: {
    switchSerachShowHide() {
      if (this.$isMobile) {
        document.addEventListener('touchstart', (elem) => {
          this.startPageX = elem.touches[0].pageX
          this.startPageY = elem.touches[0].pageY
        })
        document.addEventListener('touchmove', (elem) => {
          this.dealWitchTouchCB(elem.touches)
        })
        // @desc: Fix can't perfect work about touchmove in IOS system.
        if (isIosSystem()) {
          document.addEventListener(
            'scroll',
            this.$_.throttle(() => {
              const operateTabsElem = document.getElementById('operate-tabs')
              const tabstoTopSpace = operateTabsElem && operateTabsElem.getBoundingClientRect().top
              if (tabstoTopSpace > 50) {
                this.handleSearchInput('removeClass')
              }
            }, 60),
            false
          )
        }
      }
    },

    getDistanceAngle(angx, angy) {
      return (Math.atan2(angy, angx) * 180) / Math.PI
    },

    requestSearchTarget(queryString, callback) {
      return throttle(() => {
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
      }, 300)
    },

    dealWitchTouchCB(touches) {
      const endPageX = touches[0].pageX
      const endPageY = touches[0].pageY

      const distanceX = endPageX - this.startPageX
      const distanceY = endPageY - this.startPageY
      const angle = this.getDistanceAngle(distanceX, distanceY)
      const isShortDistance = Math.abs(distanceY) < 25
      if (isShortDistance) return

      const isUpDirection = angle >= -135 && angle <= -45
      const isDownDirection = angle > 45 && angle < 135
      if (isDownDirection) {
        this.handleSearchInput('removeClass')
      } else if (isUpDirection) {
        this.handleSearchInput('addClass')
      }
    },

    handleSearchInput(funcName) {
      const searchNiceElem = document.getElementById('search-nice')
      $document[funcName](searchNiceElem, 'search-extra-class')

      const subHeadElem = document.getElementById('sub-head')
      subHeadElem && $document[funcName](subHeadElem, 'sub-head-follow')
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
            // this.$nextTick(() => {})
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
      let niceDesc = marked(tempDesc, {
        sanitize: true,
      })
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

<template>
  <el-autocomplete
    popper-class="search-autocomplete"
    select-when-unmatched="true"
    :trigger-on-focus="isTriggerFocus"
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
      <span class="item-desc" v-html="styleForDesc(item)"></span>
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
      isTriggerFocus: true
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
      if (queryString.trim() === '') {
        return this.$apis.getRandomLinks({ size: 6 }).then(result => {
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
      this.$router.push(`/post/${item._id}`)
    },

    handleIconClick () {
    },

    handleSearchFocus () {
      if (!this.$isMobileScreen()) {
        document.querySelector('.el-input__inner').style.width = '395px'
      }
    },

    handleSearchBlur () {
      if (!this.$isMobileScreen()) {
        document.querySelector('.el-input__inner').style.width = '200px'
      }
    },

    styleForTitle (item) {
      return item.title.replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    },

    styleForDesc (item) {
      const tempDesc = (item && item.stype)
        ? item[item.stype].replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
        : item.review || item.desc
      return marked(tempDesc, {
        sanitize: true
      })
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
      height: 30rem;
      min-height: 30rem;
    }
    .el-autocomplete-suggestion__list li {
      border-bottom: 1px dashed $border-grey;
    }
  }
}

.search-autocomplete {
  li {
    padding: 10px;
    .item-title{
      font-size: $font-medium;
      color: $black;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .item-desc{
      padding-top: 5px;
      color: $silver-grey;
      font-size: $font-small;
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

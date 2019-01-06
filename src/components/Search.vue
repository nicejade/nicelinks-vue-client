<template>
  <el-autocomplete
    popper-class="search-autocomplete"
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
export default {
  name: 'Search',
  data () {
    return {
      keyword: ''
    }
  },

  props: {
    isChange: {
      type: Boolean,
      default: false
    }
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
      if (!queryString) return

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
      if (this.isChange) {
        document.querySelector('.el-input__inner').style.width = '395px'
      }
    },

    handleSearchBlur () {
      if (this.isChange) {
        document.querySelector('.el-input__inner').style.width = '200px'
      }
    },

    styleForTitle (item) {
      return item.title.replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    },

    styleForDesc (item) {
      const stype = item.stype
      return item[stype].replace(this.keyword, `<i class="keyword">${this.keyword}</i>`)
    }
  },

  locales: {
    zh: {
      mySiteFunc: '云集世间优秀站点',
      produced: '出品'
    },
    en: {
      mySiteFunc: 'Gathered in the world excellent site',
      produced: 'Produced'
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

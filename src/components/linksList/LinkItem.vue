<template>
  <div class="content">
    <div class="meta">
      <span class="item classify"
        @click.stop.prevent="onThemeClick(item.theme)">
        {{ fillThemeName(item.classify, item.theme) }}
      </span>
      <a class="item username" :href="getUserPath(item.createdBy)" target="_blank">
        {{ item.createdBy || '' }}
      </a>
      <span >{{ item.created | dateOffset }}</span>
      <a class="tag"
        v-for="(iitem, index) in item.tags" :key="index"
        :href="getTagPath(iitem)"  target="_blank"
      >
        {{ iitem }}
      </a>
    </div>
    <h3 class="title">
      <a class="title-link" :href="item.urlPath" target="_blank">{{ item.title }}</a>
    </h3>
    <div class="abstract" v-if="isAbstract">
      {{ item.abstract || $util.interceptString(item.desc) }}
    </div>
    <div v-if="!isAbstract">
      <div v-if="item.keywords" class="link-keywords">
        <strong>{{$t('keywordStr')}}</strong>
        {{ item.keywords }}
      </div>
      <div class="link-desc"
        v-html="this.obtainLinkDesc(item)">
      </div>
      <div v-if="item.review" class="link-review">
        <strong>{{ $t('reviewStr') }}</strong>
        <span v-html="item.review"></span>
      </div>
    </div>
    <div class="action-list">
      <div class="action-item" @click.stop.prevent="onLikeClick(item)">
        <icon class="icons" :name="item.isLikes ? 'likes-down' : 'likes'"></icon>
        <span class="item-num">{{ item.likes }}</span>
      </div>
      <div class="action-item" @click.stop.prevent="onDislikeClick(item)">
        <icon class="icons" :name="item.isDislikes ? 'dislike-down' : 'dislike'"></icon>
        <span class="item-num">{{ item.dislikes }}</span>
      </div>
    </div>
    <slot name="link-share"></slot>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'LinkItem',

  data () {
    return {
      classifyList: $config.classify,
      themeList: $config.theme,
      tagsList: $config.tags
    }
  },

  props: {
    item: {
      type: [Array, Object],
      default: () => { return {} }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isAbstract: {
      type: Boolean,
      default: false
    }
  },

  watch: {
  },

  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    dispatchAction (row, action) {
      if (!this.$isLogin()) {
        this.$switchToLogin()
        return
      }

      let params = {
        'userId': this.userInfo._id,
        '_id': row._id,
        'action': action
      }
      this.$apis.dispatchAction(params).then(result => {
        row[action] = result.count
        let actionIdx = action === 'likes' ? 'isLikes' : 'isDislikes'
        row[actionIdx] = !row[actionIdx]
      }).catch((error) => {
        this.$message.error(`${error}`)
      })
    },

    queryTagsArr (classify, tags) {
      let checkTagsArr = this.tagsList[classify]
      let resultArr = []
      checkTagsArr.map(obj => {
        tags.map(item => {
          if (item === obj.value) {
            resultArr.push({
              'key': obj.key,
              'value': obj.value
            })
          }
        })
      })
      return resultArr
    },

    fillThemeName (classify, theme) {
      let result = ''
      this.themeList[classify].map(item => {
        if (item.value === theme) {
          result = item.key
        }
      })
      return result
    },

    getUserPath (username) {
      let userName = username || this.userInfo.username
      return `/member/${userName}`
    },

    getTagPath (item) {
      return `/tags/${item}`
    },

    obtainLinkDesc (item = {}) {
      return item.desc ? item.desc.split('\n').join('<br>') : ''
    },

    /* -----------------------onClickEvent-----------------------Start */
    onThemeClick (theme) {
      this.$switchRouteByTheme(theme)
    },

    onLinkClick (item) {
      window.open(item.urlPath, item.title)
    },

    onLikeClick (row) {
      this.dispatchAction(row, 'likes')
    },

    onDislikeClick (row) {
      this.$confirm(this.$t('dislikesTips'), this.$t('warmReminder'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.dispatchAction(row, 'dislikes')
      }).catch(() => {
      })
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../../assets/scss/variables.scss";
@import './../../assets/scss/mixins.scss';

.content{
  margin: 5px;
  .title{
    margin: 15px 0;
    .title-link{
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 1.2;
      text-decoration: none;
      color: $link-title;
      &:hover{
        color: $link-title-hover;
      }
    }
  }
  .abstract{
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: $silver-grey;
    line-height: 1.5;
    letter-spacing: .02rem;
  }
  .meta{
    font-size: 1.314rem;
    color: $black-grey;
    .item{
      cursor: pointer;
      &:after{
        content: "\B7";
        margin: 0 .4em;
      }
    }
    .classify{
      color: $brand;
      font-size: 500;
    }
    .username{
      color: $black-grey;
      &:hover{
        color: $brand;
      }
    }
    .tag{
      color: $black-grey;
      cursor: pointer;
      &:hover{
        color: $brand;
      }
    }
    .tag + .tag{
      &:before{
        margin: 0 .1em;
        content: "/";
        color: $black-grey;
      }
    }
  }
  .action-list{
    display: inline-flex;
    display: -webkit-flex;
    .action-item{
      @include flex-box-center();
      cursor: pointer;
      padding: .2rem .8rem;
      height: 100%;
      text-align: center;
      min-width: 3.6rem;
      border: 1px solid $item-border-color;
      .icons{
        width: 1.6rem;
        height: 1.6rem;
      }
      .icon-green{
        color: $green;
      }
      .item-num{
        color: $black;
        margin-left: .2em;
        font-weight: 700;
      }
    }
    .action-item + .action-item{
      border-left: none;
    }
  }
}
</style>

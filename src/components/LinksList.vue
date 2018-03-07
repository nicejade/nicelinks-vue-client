<template>
<div class="links-list">
  <div class="moudle" v-if="pdata.length <= 0">
    <div class="content">
      <el-card class="tip-box-card" v-if="!isLoading">
        <div slot="header" class="clearfix">
          <h4>{{ $t('warmReminder') }}</h4>
        </div>
        <div class="no-result-tip" v-html="$t('noResultTip')"></div>
      </el-card>
      <content-placeholder v-else slot="link-desc" :rows="placeholderRows">
      </content-placeholder>
    </div>
  </div>

  <div class="moudle" v-for="(item, index) in pdata" v-if="pdata.length > 0">
    <router-link :to="getAssembleRoute(item)">
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
            v-for="(item, index) in item.tags" :key="index"
            :href="getTagPath(item)"  target="_blank"
          >
            {{ item }}
          </a>
        </div>
        <h3 class="title">
          <a class="title-link" :href="item.urlPath" target="_blank">{{ item.title }}</a>
        </h3>
        <div class="abstract" v-if="isAbstract">
          {{ item.abstract || $util.interceptString(item.desc) }}
        </div>
        <slot name="link-keywords"></slot>
        <slot name="link-desc"></slot>
        <slot name="link-review"></slot>
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
    </router-link>
  </div>
</div>
</template>

<script>
import ContentPlaceholder from 'vue-content-placeholder'
import $config from 'config'

export default {
  name: 'LinksList',
  data () {
    return {
      classifyList: $config.classify,
      themeList: $config.theme,
      tagsList: $config.tags,
      placeholderRows: [
        {
          height: '2rem',
          boxes: [[0, '30%']]
        },
        {
          height: '1rem',
          boxes: [[0, 0]]
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']]
        },
        {
          height: '1rem',
          boxes: [[0, 0]]
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']]
        },
        {
          height: '2rem',
          boxes: [[0, 0]]
        },
        {
          height: '2rem',
          boxes: [[0, '88%']]
        },
        // show again - segmenting placeholder Start
        {
          height: '2rem',
          boxes: [[0, 0]]
        },
        // show again - segmenting placeholder End
        {
          height: '2rem',
          boxes: [[0, '30%']]
        },
        {
          height: '1rem',
          boxes: [[0, 0]]
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']]
        },
        {
          height: '1rem',
          boxes: [[0, 0]]
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']]
        },
        {
          height: '2rem',
          boxes: [[0, 0]]
        },
        {
          height: '2rem',
          boxes: [[0, '88%']]
        }
      ]
    }
  },

  props: {
    pdata: {
      type: [Array, Object],
      default: () => { return [] }
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

  components: {
    ContentPlaceholder
  },

  created () {
  },

  methods: {
    dispatchAction (row, action) {
      if (!this.$isLogin()) {
        this.$router.push('/login')
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

    getAssembleRoute (item) {
      return `/post/${item._id}`
    },

    getUserPath (username) {
      let userName = username || this.userInfo.username
      return `/member/${userName}`
    },

    getTagPath (item) {
      return `/tags/${item}`
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
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';

.links-list{
  .moudle{
    padding: 2rem;
    text-align: left;
    border-bottom: 1px solid $item-border-color;
    &:hover{
      background-color: $white-grey;
    }
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
  }
}
</style>

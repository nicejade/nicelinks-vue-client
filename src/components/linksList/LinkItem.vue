<template>
  <div class="content">
    <div class="info-block mb-normal" v-if="!isAbstract">
      <a class="user-info" :href="getUserPath(item.createdBy)" @click.stop="onStopPropagationClick('avatar')"
        target="_blank" rel="noopener">
        <img class="avatar" :src="userAvatar" :alt="$t('niceLinksStr')" />
      </a>
      <div class="meta-block">
        <div class="meta-box">
          <a class="gtag-track username" :href="getUserPath(item.createdBy)"
            @click.stop="onStopPropagationClick('username')" target="_blank" rel="noopener">{{
                mUserInfo.profile.nickname || item.createdBy || ''
            }}</a>
        </div>
        <div class="meta-box">
          <span class="item">分享于 {{ dateOffset(item.created) }}</span>
          <span>阅读数 {{ item.countup + 1 }}</span>
        </div>
      </div>
    </div>
    <h2 class="mb-normal" :style="isAbstract ? '' : 'margin-top: 3rem;'">
      <a v-if="isAbstract" class="title-link text-ellipsis" :href="'/post/' + item._id"
        @click.stop="onStopPropagationClick('list-title', 'list')">
        {{ item.title }}</a>
      <a v-else class="title-link" :href="getRedirectLink(item.urlPath, item.alive)"
        @click.stop="onStopPropagationClick('item-title')" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="22" height="22"
          style="margin-right: 5px;" viewBox="0 0 24 24" stroke-width="1.5" stroke="#34dfa5" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M0 0h24v24H0z" stroke="none" />
          <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" />
          <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" />
        </svg>
        {{ item.title }}
      </a>
    </h2>
    <div class="meta-box mb-normal">
      <a class="item classify" @click.stop="onStopPropagationClick('classify')"
        :href="'/theme/' + item.theme.toLocaleLowerCase()">{{ fillThemeName(item.classify, item.theme) }}</a>
      <a class="tag" v-for="iitem in item.tags" :key="iitem._id" :href="getTagPath(iitem)"
        @click.stop="onStopPropagationClick('tags')" target="_blank" rel="noopener">{{ iitem }}</a>
    </div>
    <!-- list is abstract: 是否显示摘要内容  -->
    <div class="abstract mb-normal" style="-webkit-box-orient: vertical;" v-if="isAbstract">
      {{ getAbstractContent(item) }}
    </div>
    <div v-if="!isAbstract">
      <div v-if="isShowKeywords && item.keywords" class="link-keywords">
        <strong>{{ $t('keywordStr') }}</strong>
        {{ item.keywords }}
      </div>
      <div class="link-desc" v-html="this.obtainLinkDesc(item)"></div>
      <div class="link-screenshot">
        <img data-zoomable class="screenshot" :src="linkScreenshot"
          onerror="javascript:this.src='https://oss.nicelinks.site/nicelinks.site.png';" :alt="item.title + ' 倾城之链'" />
      </div>
      <div v-if="item.review" class="link-review">
        <preview-md :value="getReviewContent(item)"></preview-md>
      </div>
    </div>
    <div class="operate-area" v-if="!isAbstract">
      <el-button class="btn" @click="onCopyLinkClick(item)">复制地址</el-button>
      <el-button class="btn" type="primary" @click="onVisitLinkClick(item)">立即访问</el-button>
    </div>
    <div class="action-list">
      <div class="action-item" @click.stop.prevent="onLikeClick(item)">
        <heart :is-down="$isLogin() && item.isLikes"></heart>
        <span class="item-num">{{ item.likes }}</span>
      </div>
      <div class="action-item" @click.stop.prevent="onDislikeClick(item)">
        <heart-broken :is-down="$isLogin() && item.isDislikes"></heart-broken>
        <span class="item-num">{{ item.dislikes }}</span>
      </div>
      <div class="action-item" v-if="isAbstract">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="22" height="22"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="#9393aa" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="12" cy="12" r="2" />
          <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7" />
        </svg>
        <span class="item-num">{{ item.countup }}</span>
      </div>
      <div class="action-item" @click.stop.prevent="onEditClick(item)" v-if="isAdminFlag()">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="22" height="22"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="#9393aa" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M0 0h24v24H0z" stroke="none" />
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span class="item-num">{{ $t('edit') }}</span>
      </div>
      <div class="action-item" @click.stop.prevent="onCopyClick(item)" v-if="isAdminFlag()">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="22" height="22"
          style="margin-right: 5px;" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9393aa" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M0 0h24v24H0z" stroke="none" />
          <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" />
          <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" />
        </svg>
        <span class="item-num">复制</span>
      </div>
    </div>
    <edit-dialog v-model="isShowDlgFlag" :pdata="currentRowData" @update-success="onUpdateSuccess"></edit-dialog>
  </div>
</template>

<script>
import mediumZoom from 'medium-zoom'
import marked from 'marked'

import EditDialog from 'components/dialog/EditDialog'
import PreviewMd from 'components/markdown/PreviewMd.vue'
import Heart from 'components/Heart.vue'
import HeartBroken from 'components/HeartBroken.vue'

import $config from 'config'
import { NICE_LINKS, REDIRECT_PATH } from 'config/constant'
import { copyToClipboard } from './../../helper/system.js'
import { getCurrentDate, getHostnameByUrl, interceptString } from './../../helper/tool'

export default {
  name: 'LinkItem',

  data() {
    return {
      item: {},
      themeList: Object.freeze($config.theme),
      tagsList: Object.freeze($config.tags),
      isShowKeywords: true,
      isShowDlgFlag: false,
      isRequesting: false,
      currentRowData: {},
      linkScreenshot: 'https://oss.nicelinks.site/nicelinks.site.png',
      mUserInfo: {
        profile: {},
      },
    }
  },

  props: {
    pitem: {
      type: [Array, Object],
      default: () => {
        return {}
      },
    },
    isAbstract: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    reviewPrefix() {
      return `**${this.$t('reviewStr')}**`
    },
    userAvatar() {
      if (this.mUserInfo && !this.isAbstract) {
        const defaultAvatar = 'https://image.nicelinks.site/default-avatar.jpeg'
        const userAvatar = this.mUserInfo.profile && this.mUserInfo.profile.avatar
        return userAvatar ? `/api/avatar/${userAvatar}` : defaultAvatar
      }
    },
  },

  watch: {},

  components: {
    EditDialog,
    PreviewMd,
    Heart,
    HeartBroken,
  },

  created() {
    this.item = JSON.parse(JSON.stringify(this.pitem))
  },

  mounted() {
    this.updatelinkScreenshot()
    if (!this.isAbstract) {
      this.getUserInfoByUsername()
    }
    this.$nextTick((_) => {
      mediumZoom('[data-zoomable]')
    })
  },

  methods: {
    dateOffset(datetime = '') {
      if (!arguments.length) return ''

      const now = new Date(getCurrentDate()).getTime()
      const offsetValue = now - new Date(datetime).getTime()
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let week = day * 7
      let month = day * 30
      let year = month * 12

      let unitArr = ['年前', '月前', '周前', '天前', '小时前', '分钟前', '刚刚']
      let offsetArr = [year, month, week, day, hour, minute].map((item, index) => {
        return {
          value: offsetValue / item,
          unit: unitArr[index],
        }
      })

      for (let key in offsetArr) {
        if (offsetArr[key].value >= 1) {
          return parseInt(offsetArr[key].value) + ' ' + offsetArr[key].unit
        }
      }
      return unitArr[6]
    },

    getUserInfoByUsername() {
      let params = { username: this.item.createdBy }
      this.$apis
        .getUserInfo(params)
        .then((result) => {
          this.mUserInfo = Object.freeze(result)
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
        .finally(() => { })
    },

    getReviewContent(item) {
      return (
        this.reviewPrefix +
        item.review +
        `── 出自[倾城之链 | ${item.title}](https://nicelinks.site/post/${item._id})。`
      )
    },

    getAbstractContent(item) {
      const content = !!item.review
        ? marked(item.review, {
          sanitize: false,
        }).replace(/<[^>]*>/g, '')
        : item.desc
      return interceptString(content)
    },

    isAdminFlag() {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    },

    updatelinkScreenshot() {
      const hostname = getHostnameByUrl(this.item.urlPath)
      this.linkScreenshot = `https://oss.nicelinks.site/${hostname}.png?x-oss-process=style/png2jpg`
    },

    dispatchAction(row, action) {
      if (!this.$isLogin()) {
        this.$switchToLogin()
        return
      }

      if (this.isRequesting) return
      this.isRequesting = true
      let params = {
        userId: this.userInfo._id,
        _id: row._id,
        action: action,
      }
      this.$apis
        .dispatchAction(params)
        .then((result) => {
          const actionIdx = action === 'likes' ? 'isLikes' : 'isDislikes'
          row[action] = result.count
          row[actionIdx] = !row[actionIdx]
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isRequesting = false
        })
    },

    queryTagsArr(classify, tags) {
      let checkTagsArr = this.tagsList[classify]
      let resultArr = []
      checkTagsArr.map((obj) => {
        tags.map((item) => {
          if (item === obj.value) {
            resultArr.push({
              key: obj.key,
              value: obj.value,
            })
          }
        })
      })
      return resultArr
    },

    fillThemeName(classify, theme) {
      let result = ''
      this.themeList[classify].map((item) => {
        if (item.value === theme) {
          result = item.key
        }
      })
      return result
    },

    getUserPath(username) {
      let userName = username || this.userInfo.username
      return `/member/${userName}`
    },

    getTagPath(item) {
      return `/tags/${item}`
    },

    obtainLinkDesc(item = {}) {
      return item.desc ? item.desc.split('\n').join('<br>') : ''
    },

    copySuccessPrompt() {
      this.$message({
        type: 'success',
        message: '已成功将该链接复制到剪切板.',
      })
    },

    getRedirectLink(url, isalive, isauto) {
      const more = isalive ? '' : `&alive=0`
      const auto = isauto ? '&isauto=1' : ''
      return `${REDIRECT_PATH}${url}${more}${auto}`
    },

    /* -----------------------onClickEvent-----------------------Start */
    onStopPropagationClick(action, category = 'post') {
      this.$gtagTracking(action, category, action)
    },

    onThemeClick(theme) {
      this.$switchRouteByTheme(theme)
    },

    onLikeClick(row) {
      this.dispatchAction(row, 'likes')
    },

    onDislikeClick(row) {
      this.$confirm(this.$t('dislikesTips'), this.$t('warmReminder'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning',
      })
        .then(() => {
          this.dispatchAction(row, 'dislikes')
        })
        .catch(() => { })
    },

    onEditClick(item) {
      this.isShowDlgFlag = true
      this.currentRowData = item
    },

    onCopyClick(item) {
      copyToClipboard(`${NICE_LINKS}/post/${item._id}`)
      this.copySuccessPrompt()
    },

    onUpdateSuccess() { },

    onCopyLinkClick(item) {
      copyToClipboard(item.urlPath)
      this.copySuccessPrompt()
      this.$gtagTracking('copy-link', 'post', 'copy-link')
    },

    onVisitLinkClick(item) {
      this.$gtagTracking('visit-link', 'post', 'visit-link')
      const targetLink = this.getRedirectLink(item.urlPath, item.alive, true)
      window.open(targetLink, item.title)
    },
  },
}
</script>

<style media="screen" lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.medium-zoom-image--opened {
  z-index: 10000;
}

.content {
  .title-link {
    font-size: 1.8rem;
    font-weight: bolder;
    line-height: 1.2;
    text-decoration: none;
    color: $link-title;
    transition: color 0.3s ease-in;

    &:hover {
      transition: color 0.3s ease-out;
      color: $link-title-hover;
    }
  }

  .abstract {
    width: 100%;
    font-size: $font-small;
    color: $black-grey;
    line-height: 1.5;
    letter-spacing: 0.02rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .operate-area {
    @include flex-box-center(row, center, center);
    margin: 2.1rem auto;

    .btn {
      margin: 0 2rem;
      padding: 1rem 3rem;
      border-radius: 2rem;
      cursor: pointer;
      text-decoration: none;
      transition: all 250ms;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

      &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        transform: scale(1.05) rotate(-1deg);
      }
    }

    .el-button--primary {
      color: $brand;
      background-color: transparent;
      border-color: $brand;

      &:hover {
        color: $white;
      }
    }
  }

  .link-keywords,
  .link-review {
    margin: 15px 0;
    color: $black-grey;
    font-size: $font-small;
    line-height: 1.6;

    strong {
      font-weight: 700;
      color: $link-title;
    }
  }

  .link-keywords {
    word-break: break-all;
  }

  .link-desc {
    color: $silver-grey;
    margin: 15px auto;
    padding-left: 10px;
    word-break: break-all;
    line-height: $font-large;
    font-size: $font-small;
    word-spacing: 4px;
    border-left: 2px solid $border-grey;
  }

  .segmenting-line {
    border-top: 1px solid #8c8b8b;
    border-bottom: 1px solid #ffffff;
  }

  .link-screenshot {
    margin-bottom: 15px;
    filter: drop-shadow(0px 0px 15px lightgrey);

    .screenshot {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
    }
  }

  .info-block {
    @include flex-box-center(row, start, center);

    .avatar {
      position: relative;
      float: left;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      box-shadow: 0px 10px 30px 0px rgba(0, 64, 128, 0.1);
      margin: 0;
      aspect-ratio: 1 / 1;
    }

    .user-info {
      margin-right: 15px;
    }
  }

  .meta-box+.meta-box {
    margin-top: 15px;
  }

  .meta-box {
    font-size: $font-small;
    color: $silver-grey;

    .item {
      &:after {
        content: '\B7';
        margin: 0 0.4em;
      }
    }

    .classify {
      color: $brand;
      font-size: 500;
    }

    .username {
      color: $black-grey;

      &:hover {
        color: $brand;
      }
    }

    .tag {
      color: $silver-grey;
      cursor: pointer;

      &:hover {
        color: $brand;
      }
    }

    .tag+.tag {
      &:before {
        margin: 0 0.4em;
        content: '/';
        color: $silver-grey;
      }
    }
  }

  .action-list {
    display: inline-flex;
    display: -webkit-flex;

    .action-item {
      @include flex-box-center(row, start);
      cursor: pointer;
      padding: 0;
      height: 100%;
      text-align: center;
      min-width: 3.6rem;

      .icons {
        width: 1.8rem;
        height: 1.8rem;
        margin-left: 0;
        margin-right: 5px;
      }

      .icon-green {
        color: $green;
      }

      .item-num {
        color: $silver-grey;
        margin-left: 0.2em;
        font-weight: 400;
      }
    }

    .action-item+.action-item {
      margin-left: 3rem;
      border-left: none;
    }
  }
}
</style>

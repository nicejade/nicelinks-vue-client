<template>
  <div class="content">
    <div class="info-block mb-normal" v-if="!isAbstract">
      <a class="user-info" :href="getUserPath(item.createdBy)" target="_blank" rel="noopener">
        <img class="avatar" :src="userAvatar" :alt="$t('niceLinksStr')" />
      </a>
      <div class="meta-block">
        <div class="meta-box">
          <a
            class="username"
            :href="getUserPath(item.createdBy)"
            @click.stop="onStopPropagationClick"
            target="_blank"
            rel="noopener"
            >{{ mUserInfo.profile.nickname || item.createdBy || '' }}</a
          >
        </div>
        <div class="meta-box">
          <span class="item">分享于 {{ item.created | dateOffset }}</span>
          <span>阅读数 {{ item.countup + 1 }}</span>
        </div>
      </div>
    </div>
    <h2 class="title mb-normal">
      <a
        class="title-link"
        :href="$util.getRedirectLink(item.urlPath)"
        @click.stop="onStopPropagationClick"
        target="_blank"
        rel="noopener"
        >{{ item.title }}</a
      >
    </h2>
    <div class="meta-box mb-normal">
      <a class="item classify" :href="'/theme/' + item.theme.toLocaleLowerCase()">{{
        fillThemeName(item.classify, item.theme)
      }}</a>
      <a
        class="tag"
        v-for="(iitem, index) in item.tags"
        :key="index"
        :href="getTagPath(iitem)"
        @click.stop="onStopPropagationClick"
        target="_blank"
        rel="noopener"
        >{{ iitem }}
      </a>
    </div>
    <div class="abstract" v-if="isAbstract">
      {{ item.abstract || $util.interceptString(item.desc) }}
    </div>
    <div v-if="!isAbstract">
      <div v-if="isShowKeywords && item.keywords" class="link-keywords">
        <strong>{{ $t('keywordStr') }}</strong>
        {{ item.keywords }}
      </div>
      <div class="link-desc" v-html="this.obtainLinkDesc(item)"></div>
      <!-- <hr v-if="item.review" class="segmenting-line" /> -->
      <div class="link-screenshot">
        <img
          data-zoomable
          style="width: 100%;"
          :src="linkScreenshot"
          onerror="javascript:this.src='https://oss.nicelinks.site/nicelinks.site.png';"
          :alt="item.title + ' 倾城之链'"
        />
      </div>
      <div v-if="item.review" class="link-review">
        <preview-md :value="getReviewContent(item)"></preview-md>
      </div>
    </div>
    <div class="action-list">
      <div class="action-item" @click.stop.prevent="onLikeClick(item)">
        <heart :is-down="item.isLikes"></heart>
        <span class="item-num">{{ item.likes }}</span>
      </div>
      <div class="action-item" @click.stop.prevent="onDislikeClick(item)">
        <heart-broken :is-down="item.isDislikes"></heart-broken>
        <span class="item-num">{{ item.dislikes }}</span>
      </div>
      <div class="action-item" v-if="isAbstract">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-eye"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#9393aa"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="2" />
          <path
            d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"
          />
        </svg>
        <span class="item-num">{{ item.countup }}</span>
      </div>
      <div class="action-item" @click.stop.prevent="onEditClick(item)" v-if="isAdminFlag()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-settings"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#9393aa"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span class="item-num">{{ $t('edit') }}</span>
      </div>
    </div>
    <edit-dialog
      v-model="isShowDlgFlag"
      :pdata="currentRowData"
      @update-success="onUpdateSuccess"
    ></edit-dialog>
  </div>
</template>

<script>
import mediumZoom from 'medium-zoom'

import EditDialog from 'components/dialog/EditDialog'
import PreviewMd from 'components/markdown/PreviewMd.vue'
import Heart from 'components/Heart.vue'
import HeartBroken from 'components/HeartBroken.vue'

import $config from 'config'

export default {
  name: 'LinkItem',

  data() {
    return {
      classifyList: $config.classify,
      themeList: $config.theme,
      tagsList: $config.tags,
      isShowKeywords: true,
      isShowDlgFlag: false,
      currentRowData: {},
      linkScreenshot: 'https://oss.nicelinks.site/nicelinks.site.png',
      mUserInfo: {
        profile: {},
      },
    }
  },

  props: {
    item: {
      type: [Array, Object],
      default: () => {
        return {}
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
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
        let defaultAvatar = 'https://image.nicelinks.site/default-avatar.jpeg'
        let userAvatar = this.mUserInfo.profile && this.mUserInfo.profile.avatar
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

  created() {},

  mounted() {
    this.updatelinkScreenshot()
    if (!this.isAbstract) {
      this.getUserInfoByUsername()
    }
    mediumZoom('[data-zoomable]')
  },

  methods: {
    getUserInfoByUsername() {
      let params = { username: this.item.createdBy }
      this.$apis
        .getUserInfo(params)
        .then((result) => {
          this.mUserInfo = result
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
        .finally(() => {})
    },

    getReviewContent(item) {
      return (
        this.reviewPrefix +
        item.review +
        `── 出自[倾城之链 | ${item.title}](https://nicelinks.site/post/${item._id})。`
      )
    },

    isAdminFlag() {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    },

    updatelinkScreenshot() {
      if (this.item.alive) {
        const hostname = this.$util.getHostnameByUrl(this.item.urlPath)
        this.linkScreenshot = `https://oss.nicelinks.site/${hostname}.png?x-oss-process=style/png2jpg`
      } else {
        const isEvenDay = new Date().getDate() % 2 === 0
        this.linkScreenshot = isEvenDay
          ? 'https://image.nicelinks.site/nicelinks.site-screely.png'
          : 'https://image.nicelinks.site/nicelinks.site-mpb.png'
      }
    },

    dispatchAction(row, action) {
      if (!this.$isLogin()) {
        this.$switchToLogin()
        return
      }

      let params = {
        userId: this.userInfo._id,
        _id: row._id,
        action: action,
      }
      this.$apis
        .dispatchAction(params)
        .then((result) => {
          row[action] = result.count
          let actionIdx = action === 'likes' ? 'isLikes' : 'isDislikes'
          row[actionIdx] = !row[actionIdx]
        })
        .catch((error) => {
          this.$message.error(`${error}`)
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

    /* -----------------------onClickEvent-----------------------Start */
    onStopPropagationClick(elem) {},

    onThemeClick(theme) {
      this.$switchRouteByTheme(theme)
    },

    onLinkClick(item) {
      window.open(item.urlPath, item.title)
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
        .catch(() => {})
    },

    onEditClick(item) {
      this.isShowDlgFlag = true
      this.currentRowData = item
    },

    onUpdateSuccess() {},
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
  margin: 5px;
  .title {
    .title-link {
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 1.2;
      text-decoration: none;
      color: $link-title;
      transition: color 0.3s ease-in;
      &:hover {
        transition: color 0.3s ease-out;
        color: $link-title-hover;
      }
    }
  }
  .abstract {
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: $black-grey;
    line-height: 1.5;
    letter-spacing: 0.02rem;
  }

  .link-keywords,
  .link-review {
    margin: 15px 0;
    color: $black-grey;
    line-height: 1.8rem;
    strong {
      font-weight: 700;
      color: $link-title;
    }
  }
  .link-keywords {
    word-break: break-all;
  }
  .link-desc {
    color: $black-grey;
    margin: 15px auto;
    padding-left: 10px;
    word-break: break-all;
    line-height: 1.8rem;
    font-size: $font-small;
    word-spacing: 3px;
    border-left: 2px solid $black-grey;
  }
  .segmenting-line {
    border-top: 1px solid #8c8b8b;
    border-bottom: 1px solid #ffffff;
  }
  .link-screenshot {
    margin-bottom: 15px;
    filter: drop-shadow(0px 0px 15px lightgrey);
  }
  .info-block {
    @include flex-box-center(row, start, center);
    .avatar {
      float: left;
      border-radius: 50%;
      height: 6rem;
      width: 6rem;
      box-shadow: 0px 10px 30px 0px rgba(0, 64, 128, 0.1);
      position: relative;
      margin: 0;
    }
    .user-info {
      margin-right: 15px;
    }
  }
  .meta-box + .meta-box {
    margin-top: 15px;
  }
  .meta-box {
    font-size: 1.4rem;
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
    .tag + .tag {
      &:before {
        margin: 0 0.3em;
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
    .action-item + .action-item {
      margin-left: 3rem;
      border-left: none;
    }
  }
}
</style>

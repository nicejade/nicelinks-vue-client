<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="friends-desc">
              <h2 align="left" class="subtitle">
                <strong>{{ $t('friendsLinks') }}</strong>
              </h2>
              <div class="friend-hint" v-html="recommendTextStr"></div>
            </div>
            <div class="friends-list">
              <a class="item blur-effect" @click="onFriendItemClick(item)" target="_blank"
                :href="item.path + '?ref=nicelinks.site'" v-for="item in tableData" :key="item.path"
                rel="external noopener">
                <img class="icon" :src="getSiteIcon(item)"
                  onerror="javascript:this.src='https://nicelinks.oss-cn-shenzhen.aliyuncs.com/no-image.png';"
                  :alt="item.desc" />
                <div class="content hint--rounded hint--info hint--top hint--medium" :aria-label="item.desc">
                  <h2 class="title">
                    {{ item.title }}
                  </h2>
                  <div class="desc">{{ item.desc }}</div>
                </div>
              </a>
            </div>
            <LinkCard />
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkCard from 'components/LinkCard'
import { parse } from './../helper/marked'

const recommendMdText = `如果您拥有属于自己的网站或博客，非常欢迎您与[倾城之链](/)建立**友情链接**。请添加[倾城客服微信](https://nicelinks.oss-cn-shenzhen.aliyuncs.com/nicelinks-service.jpeg)并进行详细沟通，也可以在评论区中找到邮件地址。如果您喜欢<mark>倾城之链</mark>，请不要犹豫，期待您的互动。`

export default {
  name: 'FriendLink',

  data() {
    return {
      tableData: [],
      recommendTextStr: parse(recommendMdText),
    }
  },

  components: {
    LinkCard,
  },

  created() {
    this.initFetch()
  },

  mounted() {
    this.$setPageTitle('友情链接')
  },

  methods: {
    initFetch() {
      this.isLoading = true
      this.$apis
        .getFriendsLinks({})
        .then((result) => {
          this.isLoading = false
          this.tableData = Object.freeze(result)
        })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    getSiteIcon(item) {
      const urlObject = new URL(item.path)
      // return `https://icon.horse/icon/${urlObject.hostname}`
      return `https://nicelinks.oss-cn-shenzhen.aliyuncs.com/icons/${urlObject.hostname}.ico`
    },

    onFriendItemClick(item) {
      this.$gtagTracking(`link-${item.title}`, 'friend')
    },
  },
}
</script>

<style type="text/css" lang="scss" scoped>
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';

.hint--info:after {
  background-color: $border-grey !important;
}

[class*='hint--']:after {
  color: $black !important;
  text-shadow: 0 -1px 0px $white !important;
}

.hint--info.hint--top:before {
  border-top-color: $border-grey !important;
}

.entry-list {
  position: relative;
  padding: 20px 0;

  .friends-desc {
    padding: 0 20px;

    .subtitle {
      padding-bottom: 10px;
    }

    .friend-hint {
      text-align: left;
      margin-bottom: 2rem;
      line-height: 2.4rem;
      color: $common-link;
      font-size: 1.6rem;
      letter-spacing: 1px;
    }
  }
}

.friends-list {
  width: 100%;
  display: inline-grid;
  grid-template-columns: 49% 49%;
  grid-row-gap: 15px;
  // grid-column-gap: 15px;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0 20px;

  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    color: $common-link;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);

    &:hover {
      transition: color 0.3s ease-out;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    }

    .icon {
      width: 50px;
      height: 50px;
    }

    .content {
      width: calc(100% - 60px);
      text-align: left;

      .title {
        font-size: 1.6rem;
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

      .desc {
        width: 100%;
        max-width: 190px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 5px;
      }
    }
  }
}

@media screen and (max-width: $mobile-screen) {
  .entry-list {
    padding: 10px;

    .friends-list {
      width: 100%;
      display: inline-grid;
      grid-template-columns: 100%;
      // grid-row-gap: 15px;
      grid-column-gap: 15px;

      .item {
        max-width: 100%;
      }
    }
  }
}
</style>

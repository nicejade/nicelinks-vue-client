<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="friends-desc">
              <h2 align="left" class="subtitle">
                <strong>{{ $t('manageFriends') }}</strong>
              </h2>
              <div class="friend-hint">
                如果，您有自己的<strong>网站</strong>或者<strong>博客</strong>，非常欢迎您和<a
                  href="https://nicelinks.site"
                  >倾城之链</a
                >交换<strong>友情链接</strong>，请添加
                <div class="tooltip">
                  <img
                    src="https://image.nicelinks.site/倾城之链-微信-mini.jpeg"
                    onerror="javascript:this.src='https://nicelinks.oss-cn-shenzhen.aliyuncs.com/nicelinks-service.jpeg';"
                    alt="倾城客服微信"
                    class="tooltip-img"
                  />
                  <a href="https://image.nicelinks.site/倾城之链-微信-mini.jpeg">倾城客服微信</a>
                </div>
                ，进行详细沟通（当然，如果您如果喜欢，也可以通过<a href="mailto:yunjeff#163.com"
                  >邮件</a
                >）。
              </div>
            </div>
            <div class="friends-list">
              <a class="item" :href="item.path" v-for="(item, index) in tableData" :key="item.path">
                <img
                  class="icon"
                  :src="getSiteIcon(item)"
                  onerror="javascript:this.src='https://nicelinks.oss-cn-shenzhen.aliyuncs.com/no-image.png';"
                  :alt="item.desc"
                />
                <div
                  class="content hint--rounded hint--info hint--top hint--medium"
                  :aria-label="item.desc"
                >
                  <h2 class="title">
                    {{ item.title }}
                  </h2>
                  <div class="desc">{{ item.desc }}</div>
                </div>
              </a>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'hint.css'

export default {
  name: 'FriendLink',

  data() {
    return {
      tableData: [],
    }
  },

  watch: {},

  components: {},

  created() {
    this.initFetch()
  },

  metaInfo() {
    return {
      title: `${this.$t('manageFriends')} - ${this.$t('niceLinksStr')}`,
      meta: [
        { name: 'keywords', content: this.$t('keywords') },
        { name: 'description', content: this.$t('description') },
      ],
    }
  },

  mounted() {},

  methods: {
    initFetch() {
      this.isLoading = true
      this.$apis
        .getFriendsLinks({})
        .then((result) => {
          this.isLoading = false
          this.tableData = result
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
  padding: 20px;
  .friends-desc {
    .subtitle {
      padding-bottom: 10px;
    }
    .friend-hint {
      text-align: left;
      margin-bottom: 15px;
      letter-spacing: 1px;
      line-height: 18px;
      color: $common-link;
      .tooltip {
        position: relative;
        display: inline-block;
      }
      .tooltip .tooltip-img {
        position: absolute;
        top: 20px;
        left: 0px;
        z-index: 1;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
        visibility: hidden;
        width: 180px;
        height: 180px;
        padding: 0;
      }
      .tooltip:hover .tooltip-img {
        visibility: visible;
      }
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
  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    // max-width: 280px;
    padding: 15px;
    color: $common-link;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
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
      width: 100%;
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
    padding: 15px;
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
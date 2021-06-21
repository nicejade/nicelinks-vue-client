<template>
  <footer class="footer">
    <div class="footer-body">
      <div class="container">
        <div class="list-item" v-if="!isMobile">
          <dt class="title">公众号</dt>
          <dd>
            <img
              width="100"
              src="https://image.nicelinks.site/qrcode_jqx.jpg"
              alt="静晴轩 | 公众号"
            />
          </dd>
        </div>
        <div class="list-item">
          <dt class="title">产品</dt>
          <dd>
            <a class="nice-link" href="https://nicelinks.site/explore/skill">技术客栈</a>
          </dd>
          <dd>
            <a class="nice-link" href="https://nicelinks.site/explore/resource">资源之家</a>
          </dd>
          <dd>
            <a class="nice-link" href="https://nicelinks.site/explore/life">写意人生</a>
          </dd>
          <dd>
            <a class="nice-link" href="https://nicelinks.site/explore/info">信息快讯</a>
          </dd>
        </div>
        <div class="list-item">
          <dt class="title">合作</dt>
          <dd>
            <a class="nice-link" href="/about">关于我们</a>
          </dd>
          <dd>
            <a class="nice-link" href="/business">广告投放</a>
          </dd>
          <dd>
            <a class="nice-link" href="/sponsor">倾情捐赠</a>
          </dd>
          <dd>
            <a class="nice-link" href="/member/admin">联系我们</a>
          </dd>
        </div>
        <div class="list-item">
          <dt class="title">推荐</dt>
          <dd>
            <a class="nice-link" href="https://www.jeffjade.com/">晚晴幽草轩</a>
          </dd>
          <dd>
            <a class="nice-link" href="https://quickapp.lovejade.cn/">静轩之别苑</a>
          </dd>
          <dd>
            <a class="nice-link" href="https://markdown.lovejade.cn/">在线编辑器</a>
          </dd>
          <dd>
            <a class="nice-link" href="https://arya.lovejade.cn/#/zh-cn">二丫贾维斯</a>
          </dd>
        </div>
      </div>
      <div class="contact">
        <div class="tooltip">
          <img class="tooltip-img" src="https://image.nicelinks.site/qrcode_jqx.jpg" alt="静晴轩" />
          <icon class="icons" name="weixin"></icon>
        </div>
        <a
          v-for="item in contactArray"
          :data-action="'footer-social-' + item.class"
          data-category="footer"
          :data-label="'footer-social-' + item.class"
          :href="$util.assembleExternalLink(item.path + item.name)"
          :title="item.title"
          target="_blank"
          rel="noopener"
          :class="item.class"
          class="social-btn gtag-track"
        >
          <icon class="icons" :name="item.class"></icon>
        </a>
      </div>
      <div class="icp">
        <span>{{ copyright }}</span>
        <a
          class="link gtag-track"
          href="https://www.jeffjade.com?utm_source=nicelinks.site"
          target="_blank"
          rel="noopener"
          data-action="footer-jeffjade"
          data-category="footer"
          data-label="footer-jeffjade"
          >晚晴幽草轩</a
        >
        {{ $t('produced') }}
        <a class="beian-link" href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener"
          >粤ICP备17099767号</a
        >
        <img class="zero" src="/static/img/zero.gif" alt="深圳市市场监督管理局企业主体身份公示" />
      </div>
    </div>
    <a
      v-if="isShowOpenAppBtn"
      :href="getCurrentHref()"
      class="link gtag-track open-in-quickapp"
      data-action="footer-quickapp"
      data-category="footer"
      data-label="footer-quickapp"
      >{{ $t('openInQuickapp') }}</a
    >
  </footer>
</template>

<script>
import $config from 'config'

export default {
  name: 'FooterNav',
  data() {
    return {
      isMobile: window.innerWidth <= 960,
      copyright: '',
      contactArray: this.filterEntryInMobile($config.contact),
    }
  },

  computed: {
    isShowOpenAppBtn() {
      const isMobile = this.$isMobileScreen()
      const isAndroid = this.$util.isAndroidSystem()
      return isMobile && isAndroid
    },
  },

  components: {},

  created() {
    let currentYear = new Date(this.$util.getCurrentDate()).getFullYear()
    this.copyright = `Copyright © ${currentYear}`
  },

  mounted() {},

  methods: {
    filterEntryInMobile(sourceData) {
      const isMobile = this.$isMobileScreen()
      return sourceData.filter((item) => {
        return (
          (isMobile ? !item.notInMobile : true) &&
          (this.$isFromQuickapp() ? !item.notInQuickapp : true)
        )
      })
    },

    getCurrentHref() {
      const currentHref = window.location.href
      return `https://hapjs.org/app/com.graceful.sentences/browser/pages/detail?path=${currentHref}`
    },
  },

  locales: {
    zh: {
      mySiteFunc: '云集世间优秀站点',
      produced: '出品',
    },
    en: {
      mySiteFunc: 'Gathered in the world excellent site',
      produced: 'Produced',
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.footer {
  padding: 15px 0;
  // 参见：https://uigradients.com/
  @include get-gradient-background(#ece9e6, #ffffff, top);
  .footer-body {
    width: 100%;
    max-width: 1440px;
    height: $footer-height;
    @include flex-box-center(column);
    margin: auto;
    padding: 15px 20px;
    color: $footer-grey;
    .container,
    .icp,
    .contact {
      margin: 6px auto;
    }
    .container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      font-size: $font-medium;
      text-align: left;
      font-weight: 500;
      text-shadow: 1px 1px 0px #fff;
      .list-item {
        .title {
          margin-bottom: 5px;
          text-align: left;
          color: $black;
        }
        dd {
          margin: 8px 0;
          .nice-link {
            font-weight: 400;
            color: $footer-grey;
          }
        }
      }
    }
    .icp {
      font-size: $font-small;
      .beian-link {
        margin-left: 15px;
        color: $black-grey !important;
      }
      .zero {
        height: 1.5rem;
        width: 1.1rem;
        margin-left: 0.5rem;
      }
    }
    .link {
      color: $common-link;
      font-weight: 500;
      &:link,
      &:visited {
        color: $common-link;
        text-decoration: none;
      }
      &:hover,
      &:active {
        color: $common-link-hover;
        text-decoration: none;
      }
    }
  }
}
.open-in-quickapp {
  @include flex-box-center;
  width: 110px;
  height: 30px;
  line-height: 30px;
  position: fixed;
  bottom: 0;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  background-color: $brand;
  color: $white !important;
  border: 1px solid $brand;
  border-radius: 15px;
  padding: 5px 10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: $zindex-quickapp-btn;
}
/* Tooltip 容器 */
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltip-img {
  position: absolute;
  top: -200px;
  left: -80px;
  z-index: 1;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  visibility: hidden;
  width: 200px;
  height: 200px;
  padding: 0;
}
.tooltip:hover .tooltip-img {
  visibility: visible;
}
</style>

<template>
  <footer class="footer">
    <div class="footer-body">
      <div class="container">
        <div class="list-item show-on-big-screen">
          <p class="title">公众号</p>
          <img
            width="100"
            src="https://image.nicelinks.site/qrcode_jqx.jpg"
            alt="晚晴幽草轩 | 公众号"
          />
        </div>
        <div class="list-item">
          <p class="title">产品</p>
          <a
            class="nice-link gtag-track"
            data-action="explore-skill"
            data-category="footer"
            data-label="explore-skill"
            href="https://nicelinks.site/explore/skill"
            >技术客栈
          </a>
          <a
            class="nice-link gtag-track"
            data-action="explore-resource"
            data-category="footer"
            data-label="explore-resource"
            href="https://nicelinks.site/explore/resource"
            >资源之家
          </a>
          <a
            class="nice-link gtag-track"
            data-action="explore-life"
            data-category="footer"
            data-label="explore-life"
            href="https://nicelinks.site/explore/life"
            >写意人生
          </a>
          <a
            class="nice-link gtag-track"
            data-action="explore-info"
            data-category="footer"
            data-label="explore-info"
            href="https://nicelinks.site/explore/info"
            >信息快讯
          </a>
        </div>
        <div class="list-item">
          <p class="title">合作</p>
          <a
            class="nice-link gtag-track"
            data-action="about"
            data-category="footer"
            data-label="about"
            href="/about"
            >关于我们</a
          >
          <a
            class="nice-link gtag-track"
            data-action="business"
            data-category="footer"
            data-label="business"
            href="/business"
            >广告投放</a
          >
          <a
            class="nice-link gtag-track"
            data-action="sponsor"
            data-category="footer"
            data-label="sponsor"
            href="/sponsor"
            >倾情捐赠
          </a>
          <a
            target="_blank"
            rel="noopener"
            class="nice-link gtag-track"
            data-action="weekly"
            data-category="footer"
            data-label="weekly"
            href="https://blog.nicelinks.site/?ref=nicelinks.site"
            >倾城博客
          </a>
        </div>
        <div class="list-item">
          <p class="title">推荐</p>
          <a
            class="nice-link gtag-track"
            target="_blank"
            data-action="jeffjade-com"
            data-category="footer"
            data-label="jeffjade-com"
            href="https://www.jeffjade.com/?ref=nicelinks.site"
            >晚晴幽草轩</a
          >
          <a
            class="nice-link gtag-track"
            target="_blank"
            data-action="footkapp-lovejade"
            data-category="footer"
            data-label="footkapp-lovejade"
            href="https://quickapp.lovejade.cn/?ref=nicelinks.site"
            >静轩之别苑</a
          >
          <a
            class="nice-link gtag-track"
            target="_blank"
            data-action="forum-lovejade"
            data-category="footer"
            data-label="forum-lovejade"
            href="https://forum.lovejade.cn/?ref=nicelinks.site"
            >悠然宜想亭</a
          >
          <a
            class="nice-link gtag-track"
            target="_blank"
            data-action="wiki-lovejade"
            data-label="wiki-lovejade"
            href="https://wiki.lovejade.cn/?ref=nicelinks.site"
            >清风明月阁</a
          >
        </div>
      </div>
      <div class="contact">
        <div class="tooltip">
          <img class="tooltip-img" src="https://image.nicelinks.site/qrcode_jqx.jpg" alt="静晴轩" />
          <icon class="icons" name="weixin"></icon>
        </div>
        <a
          v-for="item in contactArray"
          :data-action="'social-' + item.class"
          data-category="footer"
          :data-label="'social-' + item.class"
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
          data-action="link-jeffjade"
          data-category="footer"
          data-label="link-jeffjade"
          href="https://www.jeffjade.com?utm_source=nicelinks.site"
          target="_blank"
          rel="noopener"
          >晚晴幽草轩</a
        >
        出品
        <br class="show-on-small-screen" />
        <a
          class="beian-link gtag-track"
          data-action="beian"
          data-category="footer"
          data-label="beian"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener"
          >粤ICP备17099767号</a
        >
        <img class="zero" src="/static/img/zero.gif" alt="深圳市市场监督管理局企业主体身份公示" />
      </div>
    </div>
  </footer>
</template>

<script>
import pageMixin from 'mixins/pageMixin.js'
import $config from 'config'
import { getCurrentDate } from './../helper/tool'

export default {
  name: 'FooterNav',

  data() {
    return {
      copyright: '',
      contactArray: Object.freeze(this.filterEntryInMobile($config.contact)),
    }
  },

  mixins: [pageMixin],

  computed: {},

  components: {},

  created() {
    let currentYear = new Date(getCurrentDate()).getFullYear()
    this.copyright = `Copyright © ${currentYear}`
  },

  mounted() {},

  methods: {
    filterEntryInMobile(sourceData) {
      const isMobile = this.$isMobile
      return sourceData.filter((item) => {
        return isMobile ? !item.notInMobile : true
      })
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.footer {
  position: relative;
  padding: 2rem 0;
  // 参见：https://uigradients.com/
  @include get-gradient-background(#ece9e6, #ffffff, top);

  .footer-body {
    width: 100%;
    max-width: 1280px;
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
      font-size: $font-small;
      text-align: left;
      font-weight: 500;
      text-shadow: 1px 1px 0px #fff;

      .list-item {
        .title {
          margin-bottom: 1rem;
          text-align: left;
          color: $black;
        }

        .nice-link {
          display: block;
          margin: 1rem 0;
          font-weight: 400;
          color: $footer-grey;
        }
      }
    }

    .icp {
      font-size: $font-small;
      line-height: 1.6;

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

/* Tooltip 容器 */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-img {
  position: absolute;
  top: -180px;
  left: -80px;
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

.show-on-big-screen {
  display: block;
}

.show-on-small-screen {
  display: none;
}

@media (max-width: 960px) {
  .show-on-big-screen {
    display: none;
  }

  .show-on-small-screen {
    display: block;
  }
}
</style>

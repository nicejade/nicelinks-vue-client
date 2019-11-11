<template>
  <div id="footer-nav">
    <footer class="footer">
      <div class="footer-body">
        <div class="content">
          <p>
            <a target="_blank" rel="noopener" class="link gtag-track" href="/"
              data-action="footer-nicelinks" data-category="footer" data-label="footer-nicelinks">
              {{ $t('niceLinksStr') }}
            </a>
            : {{ $t('mySiteFunc') }}
          </p>
        </div>
        <div class="contact">
          <a v-for="item in contactArray"
            :data-action="'footer-social-' + item.class"
            data-category="footer"
            :data-label="'footer-social-' + item.class"
            :href="$util.assembleExternalLink(item.path + item.name)"
            :title="item.title"
            target="_blank"
            rel="noopener"
            :class="item.class"
            class="social-btn gtag-track">
            <icon class="icons" :name="item.class"></icon>
          </a>
        </div>
        <div class="icp">
          <span>{{ copyright }}</span>
          <a class="link gtag-track"
            href="https://jeffjade.com?from=nicelinks.site"
            target="_blank" rel="noopener"
            data-action="footer-jeffjade"
            data-category="footer"
            data-label="footer-jeffjade">
              晚晴幽草轩
          </a>
          {{ $t('produced') }}
        </div>
        <div class="beian-area icp">
          <a class="beian-link" href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener">
            粤ICP备17099767号
          </a>
          <img class="zero" src="/static/img/zero.gif" alt="深圳市市场监督管理局企业主体身份公示">
        </div>
      </div>
    </footer>
    <a v-if="isShowOpenAppBtn"
      href="javascript:;" @click="onOpenAppClick"
      class="link gtag-track open-in-quickapp"
      data-action="footer-quickapp" data-category="footer" data-label="footer-quickapp">
      {{ $t('openInQuickapp') }}
    </a>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'FooterNav',
  data () {
    return {
      copyright: '',
      contactArray: this.filterEntryInMobile($config.contact)
    }
  },

  computed: {
    isShowOpenAppBtn () {
      const isMobile = this.$isMobileScreen()
      const isAndroid = this.$util.isAndroidSystem()
      const isLoadRouterInlineJs = this.$store && this.$store.state.isLoadRouterInlineJs
      return isMobile && isAndroid && isLoadRouterInlineJs
    }
  },

  components: {
  },

  created () {
    let currentYear = (new Date(this.$util.getCurrentDate())).getFullYear()
    this.copyright = `Copyright © ${currentYear}`
  },

  mounted () {
  },

  methods: {
    filterEntryInMobile (sourceData) {
      const isMobile = this.$isMobileScreen()
      return sourceData.filter((item) => {
        return (isMobile ? !item.notInMobile : true) &&
         (this.$isFromQuickapp() ? !item.notInQuickapp : true)
      })
    },
    onOpenAppClick () {
      try {
        global.appRouter('com.quickapp.nicelinks', '/', { from: 1 })
        this.showSupportStatusToast()
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },

    showSupportStatusToast () {
      setTimeout(() => {
        this.$message({
          type: 'warning',
          message: '目前上线的平台有：OPPO、vivo、小米、魅族等'
        })
      }, 1000)
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

.footer{
  .footer-body{
    width: 100%;
    @include flex-box-center(column);
    height: $footer-height;
    padding: 15px 20px;
    color: $footer-grey;
    // 参见：https://uigradients.com/
    @include get-gradient-background(#ECE9E6, #FFFFFF, top);
    .content, .icp, .contact {
      margin: 6px auto;
    }
    .content{
      font-size: $font-medium;
      font-weight: 500;
      text-shadow: 1px 1px 0px #fff;
    }
    .icp{
      font-size: $font-small;
    }
    .link{
      color: $common-link;
      font-weight: 500;
      &:link, &:visited{
        color: $common-link;
        text-decoration: none;
      };
      &:hover, &:active{
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
.beian-area {
  .beian-link {
    vertical-align: middle;
    color: $black-grey !important;
  }
  .zero {
    height: 1.5rem;
    width: 1.1rem;
    margin-left: .5rem;
  }
}
</style>

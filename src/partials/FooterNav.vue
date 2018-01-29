<template>
  <div id="footer-nav">
    <footer class="footer">
      <div class="footer-body">
        <div class="content">
          <p>
            <a target="_blank" class="link" href="/">{{ $t('niceLinks') }}</a>
            : {{ $t('mySiteFunc') }}
          </p>
        </div>
        <div class="contact">
          <a v-for="item in contactArray"
            :href="item.path + item.name"
            :title="item.title"
            target="_blank"
            :class="item.class"
            class="social-btn">
            <icon class="icons" :name="item.class"></icon>
          </a>
        </div>
        <div class="icp">
          <span>{{ copyright }}</span>
          <a class="link" target="_blank" href="http://jeffjade.com">晚晴幽草轩</a>
          {{ $t('produced') }}
        </div>
      </div>
    </footer>
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

  components: {
  },

  created () {
    let currentYear = (new Date(this.$util.getCurrentDate())).getFullYear()
    this.copyright = `Copyright © ${currentYear} nicelinks.com`
  },

  mounted () {
  },

  methods: {
    filterEntryInMobile (sourceData) {
      let isMobile = window.innerWidth <= 768
      return sourceData.filter((element) => {
        return isMobile ? !element['notInMobile'] : true
      })
    }
  },

  locales: {
    zh: {
      niceLinks: '倾城之链',
      mySiteFunc: '云集世间优秀站点',
      produced: '出品'
    },
    en: {
      niceLinks: 'Nice Links',
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
    background-color: $footer-grey-bg;
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
</style>

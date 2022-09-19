<template>
  <div class="wrapper sponsor">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('firstPage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ $t('sponsorNiceLinks') }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="donate">
                <preview-md :value="SsWords"></preview-md>
                <br />
                <div class="wechat-pay">
                  <h3 class="pay-title">
                    <strong>微信扫码赞助</strong>
                  </h3>
                  <img
                    src="https://nicelinks.site/static/img/reward_wexin.jpg"
                    :alt="$t('niceLinksStr')"
                  />
                </div>
                <div class="zhifubao-pay">
                  <h3 class="pay-title">
                    <strong>支付宝扫码赞助</strong>
                  </h3>
                  <img
                    src="https://nicelinks.site/static/img/reward_zhifubao.jpg"
                    :alt="$t('niceLinksStr')"
                  />
                </div>
              </div>
            </el-card>
            <Waline />
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Waline from 'components/Waline'
import PreviewMd from 'components/markdown/PreviewMd.vue'
import { DESCRIPTION, NICE_LINKS_NAME, NICE_LINKS } from './../config/constant'

const SsWords = `${DESCRIPTION} 自 2017 年建设以来，完全免费使用；并始终坚持：**收录有价值内容**，打造人性化体验。

截止目前，[${NICE_LINKS_NAME}](${NICE_LINKS})从网站设计、编码，到运维、运营，涉及所有工作，皆有[@轩帅](/member/admin)在工作之余，利用碎片化时间完成；“**月黑见渔灯，孤光一点萤；微微风簇浪，散作满河星**”；您如果愿意，可通过下面两种方式，给予适当赞助/打赏，以协助「${NICE_LINKS_NAME}」持续健康运作。
`

export default {
  name: 'Sponsor',

  data() {
    return {
      SsWords: SsWords,
    }
  },

  components: {
    Waline,
    PreviewMd,
  },

  mounted() {
    this.$setPageTitle('赞助倾城')
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/variables.scss';
.sponsor {
  .donate {
    .pay-title {
      font-size: $font-small;
      color: $dropdown-grey;
      padding: 1rem 0;
    }
  }
}
</style>

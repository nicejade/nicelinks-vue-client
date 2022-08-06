<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h2>
                  <strong>{{ $t('sponsorNiceLinks') }}</strong>
                </h2>
              </div>
              <div class="donate">
                <div class="wechat-pay">
                  <h4>
                    <strong>微信捐赠</strong>
                  </h4>
                  <img
                    src="https://nicelinks.site/static/img/reward_wexin.jpg"
                    :alt="$t('niceLinksStr')"
                  />
                </div>
                <div class="zhifubao-pay">
                  <h4>
                    <strong>支付宝捐赠</strong>
                  </h4>
                  <img
                    src="https://nicelinks.site/static/img/reward_zhifubao.jpg"
                    :alt="$t('niceLinksStr')"
                  />
                </div>
                <div>
                  <h4>
                    <strong>访问小程序支持</strong>
                  </h4>
                  <img
                    style="width: 100%; margin-top: 15px;"
                    src="https://image.nicelinks.site/%E5%80%BE%E5%9F%8E%E4%B9%8B%E9%93%BE-Banner.png"
                    alt="倾城之链 - 小程序"
                  />
                </div>
              </div>
            </el-card>
            <div id="waline"></div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sponsor',

  data() {
    return {}
  },

  watch: {},

  components: {},

  mounted() {
    this.$setPageTitle('赞助倾城')
    // Add Waline Comment Functions @2022.01.24
    this.$nextTick(() => {
      this.$util.addWalineComment()
    })
  },

  methods: {},
}
</script>

<style type="text/css" lang="scss"></style>

<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h2><strong>广告投放</strong></h2>
              </div>
              <div class="advertise">
                <preview-md :value="introduce"></preview-md>
                <br />
                <img
                  class="contact-us"
                  src="https://image.nicelinks.site/nice-small-store.jpeg"
                  alt="倾城之链 - 小商店"
                />
                <img
                  style="width: 100%; height: auto; margin-top: 15px;"
                  src="https://image.nicelinks.site/%E5%80%BE%E5%9F%8E%E4%B9%8B%E9%93%BE-Banner.png"
                  alt="倾城之链 - 小程序"
                />
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
import PreviewMd from 'components/markdown/PreviewMd.vue'

const introduce = `
关于「[倾城之链](https://nicelinks.site/)」的访问量，可以参见 [alexa.com](https://www.alexa.com/siteinfo/nicelinks.site#trafficstats)；另有\`小程序\`、\`快应用\`等相关产品矩阵。目前，计划在产品详情页，开辟两个区域，来支持“广告投放”，如下图所示（广告 A 区、广告 B 区）：

![倾城之链 - 商业合作](https://image.nicelinks.site/nicelinks.site-screenshots.png)

如果您有意向在此投入广告，可以扫如下「小程序码」购买服务。
`
export default {
  name: 'Business',

  data() {
    return {
      introduce: introduce,
    }
  },

  watch: {},

  components: {
    PreviewMd,
  },

  mounted() {
    this.$setPageTitle('广告投放')

    // Add Waline Comment Functions @2022.01.24
    this.$nextTick(() => {
      this.$util.addWalineComment()
    })
  },

  methods: {},
}
</script>

<style type="text/css" lang="scss">
.advertise {
  width: 100%;
  text-align: center;
  img {
    width: 100%;
  }
  .contact-us {
    width: 250px;
    height: 250px;
    margin: 20px auto;
    text-align: center;
  }
}
</style>

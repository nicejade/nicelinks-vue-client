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
                <img class="contact-us" src="https://image.nicelinks.site/nice-small-store.jpeg" alt="倾城之链 - 小商店" />
                <img class="miniprogram-qrcode"
                  src="https://image.nicelinks.site/%E5%80%BE%E5%9F%8E%E4%B9%8B%E9%93%BE-Banner.png" alt="倾城之链 - 小程序" />
              </div>
            </el-card>
            <Waline />
          </div>
          <aside-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewMd from 'components/markdown/PreviewMd.vue'
import Waline from 'components/Waline'
import { DESCRIPTION } from './../config/constant'


const introduce = ` ${DESCRIPTION}自 2017 年建立以来，始终坚持：**收录有价值内容**，打造人性化体验。除 Web 应用，另有\`小程序\`、\`快应用\`等相关产品矩阵。目前，在产品详情页，开辟两个区域，来支持“广告投放”，如下图所示（广告 A 区、广告 B 区）：

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

  components: {
    PreviewMd,
    Waline
  },

  mounted() {
    this.$setPageTitle('广告投放')
  },
}
</script>

<style type="text/css" lang="scss">
.advertise {
  width: 100%;
  text-align: center;

  .miniprogram-qrcode {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    margin-top: 2rem;
  }

  .contact-us {
    width: 250px;
    height: 250px;
    margin: 1rem auto;
    text-align: center;
  }
}
</style>

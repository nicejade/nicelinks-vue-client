<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('firstPage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item>广告投放</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="advertise">
                <preview-md :value="introduce"></preview-md>
                <br />
                <img
                  class="contact-us"
                  src="https://image.nicelinks.site/nice-small-store.jpeg"
                  alt="倾城之链 - 小商店"
                />
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

const introduce = ` ${DESCRIPTION}自 2017 年建设以来，完全免费使用；并始终坚持：**收录有价值内容**，打造人性化体验。除 Web 应用，另有\`小程序\`、\`快应用\`等相关产品矩阵。目前，在产品详情页，开辟两个区域，来支持“广告投放”，如下图所示（广告 A 区、广告 B 区）：

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
    Waline,
  },

  mounted() {
    this.$setPageTitle('广告投放')
  },
}
</script>

<style type="text/css" lang="scss" scoped>
.advertise {
  width: 100%;
  text-align: center;

  .contact-us {
    width: 250px;
    height: 250px;
    margin: 1rem auto;
    text-align: center;
  }
}
</style>

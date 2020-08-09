<template>
  <div class="wrapper account">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list active-fail">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h4>
                  <strong>广告投放</strong>
                </h4>
              </div>
              <div class="advertise">
                <p class="explain">
                  关于「倾城之链」的访问量，可以参见
                  <a src="https://www.alexa.com/siteinfo/nicelinks.site#trafficstats">alexa</a
                  >；如果您有意向在此投入广告，可以扫如下二维码加我微信，随聊详谈。
                </p>
                <img src="https://image.nicelinks.site/jade-wechat.png" alt="倾城之链" />
                <br />
                <img
                  src="https://image.nicelinks.site/%E5%80%BE%E5%9F%8E%E4%B9%8B%E9%93%BE-Banner.png"
                  alt="倾城之链 - 小程序"
                />
              </div>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Business',

  data() {
    return {}
  },

  watch: {},

  components: {},

  mounted() {},

  methods: {},
}
</script>

<style type="text/css" lang="scss">
.advertise {
  width: 100%;
  text-align: center;
  .explain {
    text-align: left;
    line-height: 20px;
  }
  img {
    width: 200px;
    height: 200px;
    margin: 20px auto;
    text-align: center;
  }
}
</style>

<template>
  <div id="ads-position">
    <h3 class="jade-ads-title">广告位</h3>
    <el-carousel trigger="click" class="ads-body">
      <el-carousel-item v-for="(item, index) in adsList" :key="index">
        <a :href="item.path" target=_blank>
          <img :src="item.image">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { $config } from 'config'

export default {
  name: 'AdsPosition',
  data () {
    return {
      adsList: $config.ads
    }
  },

  components: {
  },

  methods: {
  }
}
</script>

<style lang="scss">
#ads-position{
  .jade-ads-title{
    font-weight: 700;
    margin: 10px 0;
    padding-top: 10px;
  }
  .ads-body{
    width: 100%;
  }
}
</style>

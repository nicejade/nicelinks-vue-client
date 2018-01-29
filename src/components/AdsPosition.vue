<template>
  <div id="jade-gg-position">
    <h3 class="aside-widget-title">{{ $t('adPosition') }}</h3>
    <el-carousel trigger="click" class="jade-gg-body"
      indicator-position="outside" :interval='3600' height="256px">
      <el-carousel-item v-for="(item, index) in advertsList" :key="index">
        <a :href="item.path" target=_blank>
          <img :src="item.image" :alt="item.alt">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'AdsPosition',

  data () {
    return {
    }
  },

  props: {
    advertsList: {
      type: [Array],
      default: []
    }
  },

  components: {
  },

  methods: {
  }
}
</script>

<style lang="scss">
#jade-gg-position{
  .jade-gg-body{
    width: 100%;
  }
}
</style>

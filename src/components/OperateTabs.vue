<template>
  <div class="operate-tabs">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane v-for="(item, index) in operateTabList" :key="item.name"
        :label="$t(item.name)" :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'OperateTabs',

  data () {
    return {
      activeName: 'hot',
      operateTabList: [
        {
          name: 'hot',
          sortTarget: 'likes',
          sortType: -1
        },
        {
          name: 'new',
          sortTarget: 'created',
          sortType: -1
        },
        {
          name: 'old',
          sortTarget: 'created',
          sortType: 1
        }
      ]
    }
  },

  watch: {
    activeName (val) {
      let currentItem = this.operateTabList.find(item => {
        return item.name === val
      })
      this.$emit('switch-tabs', currentItem)
    }
  },

  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
  },

  locales: {
    zh: {
      hot: '热门分享',
      new: '最新分享',
      old: '最早分享'
    },
    en: {
      hot: 'Popular Share',
      new: 'Latest Share',
      old: 'Earliest Share'
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

.operate-tabs{
  padding-top: 15px;
}
</style>

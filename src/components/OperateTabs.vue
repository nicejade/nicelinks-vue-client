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
      activeName: 'hottest',
      operateTabList: [
        {
          name: 'hottest',
          sortTarget: 'likes',
          sortType: -1
        },
        {
          name: 'latest',
          sortTarget: 'created',
          sortType: -1
        },
        {
          name: 'earliest',
          sortTarget: 'created',
          sortType: 1
        }
      ]
    }
  },

  watch: {
    activeName (val) {
      const currentRoutePath = this.$route.paths
      this.$router.push({ path: currentRoutePath, query: { sort: val } })

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
    const currentRouteQuery = this.$route.query
    const sortTypeArray = ['hottest', 'latest', 'earliest']
    const isWithSort = sortTypeArray.includes(currentRouteQuery)
    this.activeName = isWithSort ? currentRouteQuery.sort : 'hottest'
  },

  methods: {
  },

  locales: {
    zh: {
      hottest: '热门分享',
      latest: '最新分享',
      earliest: '最早分享'
    },
    en: {
      hottest: 'Popular Share',
      latest: 'Latest Share',
      earliest: 'Earliest Share'
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

.operate-tabs{
  padding-top: 15px;
  margin-bottom: -15px;
}
</style>

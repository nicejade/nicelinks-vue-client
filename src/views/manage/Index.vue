<template>
  <div class="wrapper" id="manage-index">
    <div class="panel-default">
      <div class="panel-body">
        <div class="operate-area">
          <el-button :plain="true" type="success"
            v-for="(item, index) in $util.getManageList()" :key="index"
            @click="onJumpClick(item.path)">{{ $t(item.name) }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'ManageIndex',

  mixins: [metaMixin],

  data () {
    const vm = this
    return {
      title: vm.$t('management')
    }
  },

  components: {
  },

  created () {
  },

  methods: {
    onJumpClick (i) {
      this.$router.push(`/manage/${i}`)
    }
  }
}
</script>

<style lang="scss">
#manage-index{
  .operate-area{
    min-height: 300px;
  }
}
</style>

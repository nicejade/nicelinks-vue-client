<template>
  <div class="wrapper" id="manage-users">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-carousel trigger="click" class="jade-gg-body"
              indicator-position="outside" :interval='3600' height="256px">
              <el-carousel-item v-for="(item, index) in tableData" :key="index">
                <a :href="item.path" target=_blank>
                  <img :src="item.image">
                </a>
              </el-carousel-item>
            </el-carousel>
            <div class="form-group">
              <el-button :plain="true" type="success" size="large"
              @click="onAddAdsClick">添加广告
              </el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="path" label="地址" min-width="200">
                <template scope="scope">
                  <el-input v-model="scope.row.path"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="image" label="图片" min-width="200">
                <template scope="scope">
                  <el-input v-model="scope.row.image"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="image" label="描述" min-width="160">
                <template scope="scope">
                  <el-input v-model="scope.row.alt"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="image" label="排序" min-width="100">
                <template scope="scope">
                  <el-input v-model="scope.row.sort"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="active" :label="$t('isActived')" width="100">
                <template scope="scope">
                  <el-switch
                    v-model="scope.row.active"
                    :on-text="$t('yes')" :off-text="$t('no')"
                    on-color="#13ce66" off-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="modifyTime" label="修改时间" width="160">
                <template scope="scope">
                  {{ scope.row.modifyTime | dateConvert }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('operation')" width="160">
                <template scope="scope">
                  <el-button size="small"
                    @click="handleSave(scope.row)">{{ $t('save') }}
                  </el-button>
                  <el-button size="small" type="danger"
                    @click="handleDelete(scope.row)">{{ $t('delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import metaMixin from 'mixins/metaMixin.js'

export default{
  name: 'ManageAdverts',

  mixins: [metaMixin],

  data () {
    const vm = this
    return {
      title: vm.$t('manageAdverts'),
      isLoading: false,
      tableData: []
    }
  },

  components: {
  },

  created () {
    this.initFetch()
  },

  watch: {
  },

  methods: {
    initFetch () {
      this.isLoading = true
      this.$apis.getAdverts({}).then(result => {
        this.isLoading = false
        this.tableData = result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })
    },

    handleSave (row) {
      this.isLoading = true
      this.$apis.updateAdverts(row).then(result => {
        this.isLoading = false
        this.$message({message: `已成功保存`, type: 'success'})
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })
    },

    handleDelete (row) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', this.$t('warmReminder'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.isLoading = true
        this.$apis.removeAdverts(row).then(result => {
          this.$message({message: `已成功删除`, type: 'success'})
          this.initFetch()
        }).catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
      }).catch(() => {
      })
    },

    onAddAdsClick () {
      this.tableData.push({
        path: '',
        image: '',
        alt: '',
        active: true,
        sort: 0,
        modifyTime: new Date()
      })
    }
  },

  locales: {
    en: {
      approved: 'Approved',
      unapproved: 'Unapproved',
      isActived: 'Is Actived',
      creater: 'Creater'
    },
    zh: {
      approved: '已审核',
      unapproved: '未审核',
      isActived: '是否已激活',
      creater: '创建者'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";

#manage-users{
  .entry-list{
    width: 100%;
    padding: 15px;
    .classify-title{
      margin: 15px auto;
    }
  }
}
</style>

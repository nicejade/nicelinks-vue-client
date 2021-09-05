<template>
  <div class="wrapper" id="manage-users">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div class="form-group">
              <el-button :plain="true" type="success" size="large" @click="onAddFriendsClick"
                >添加友链
              </el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%;">
              <el-table-column prop="path" label="地址" min-width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.path"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="image" label="标题" min-width="160">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.title"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="image" label="描述" min-width="160">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.desc"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="active" label="是否激活" width="100">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.active"
                    :on-text="$t('yes')"
                    :off-text="$t('no')"
                    on-color="#13ce66"
                    off-color="#ff4949"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="modifyTime" label="修改时间" width="160">
                <template slot-scope="scope">
                  {{ scope.row.created | dateConvert }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('operation')" width="160">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleSave(scope.row)"
                    >{{ $t('save') }}
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.row)"
                    >{{ $t('delete') }}
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

export default {
  name: 'ManageFriends',

  mixins: [metaMixin],

  data() {
    const vm = this
    return {
      title: vm.$t('manageAdverts'),
      isLoading: false,
      tableData: [],
    }
  },

  components: {},

  created() {
    this.initFetch()
  },

  watch: {},

  methods: {
    initFetch() {
      this.isLoading = true
      this.$apis
        .getFriendsLinks({})
        .then((result) => {
          this.isLoading = false
          this.tableData = result
        })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    handleSave(row) {
      this.isLoading = true
      this.$apis
        .updateFriendsLinks(row)
        .then((result) => {
          this.isLoading = false
          this.$message({ message: `已成功保存`, type: 'success' })
        })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', this.$t('warmReminder'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning',
      })
        .then(() => {
          this.isLoading = true
          this.$apis
            .removeFriendsLinks(row)
            .then((result) => {
              this.$message({ message: `已成功删除`, type: 'success' })
              this.initFetch()
            })
            .catch((error) => {
              this.isLoading = false
              this.$message.error(`${error}`)
            })
        })
        .catch(() => {})
    },

    onAddFriendsClick() {
      this.tableData.push({
        path: '',
        title: '',
        desc: '',
        active: true,
        sort: 0,
        created: new Date(),
      })
    },
  },
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';

#manage-users {
  .entry-list {
    width: 100%;
    padding: 15px;
    .classify-title {
      margin: 15px auto;
    }
  }
}
</style>

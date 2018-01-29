<template>
  <div class="wrapper" id="manage-users">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="未激活" name="first"></el-tab-pane>
              <el-tab-pane label="已激活" name="second"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="number" label="第几成员" width="100">
                <template scope="scope">{{ scope.row.number }}</template>
              </el-table-column>
              <el-table-column prop="username" label="用户名" width="160">
                <template scope="scope">
                  <el-button type="text" @click.stop="onUserClick(scope.row.username)">
                    {{ scope.row.username }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="active" :label="$t('isActived')" width="100">
                <template scope="scope">
                  <el-tag :type="scope.row.active ? 'success' : 'error'">
                    {{ scope.row.active ? $t('yes') : $t('no') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="email" label="注册邮箱" min-width="160">
                <template scope="scope">{{ scope.row.email }}</template>
              </el-table-column>
              <el-table-column prop="registeTime" :label="$t('createdDateStr')" width="160">
                <template scope="scope">{{ scope.row.registeTime | dateConvert }}</template>
              </el-table-column>
              <el-table-column :label="$t('operation')" width="160">
                <template scope="scope">
                  <el-button size="small"
                    @click="handleEdit(scope.row)">{{ $t('edit') }}
                  </el-button>
                  <el-button size="small" type="danger"
                    @click="handleDelete(scope.row)">{{ $t('delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="table-operate">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="tableControl.totalCount"
                :current-page="tableControl.pageCount"
                :page-size="tableControl.pageSize"
                :page-sizes="[20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'ManageUsers',

  data () {
    return {
      isLoading: false,
      activeName: 'first',
      tableData: [],
      tableControl: {
        totalCount: 30,
        pageCount: 1,
        pageSize: 20,
        sortType: -1,
        sortTarget: 'created'
      },
      currentRowData: {}
    }
  },

  components: {
  },

  created () {
    this.initFetch()
  },

  watch: {
    activeName (val) {
      this.initFetch()
    }
  },

  methods: {
    initFetch () {
      let params = {}
      Object.assign(params, this.tableControl)
      params.active = !(this.activeName === 'first')

      this.isLoading = true
      this.$apis.getAllUsers(params).then(result => {
        this.isLoading = false
        this.tableData = result.data
        this.tableControl.totalCount = result.count
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })
    },

    handleClick () {
    },

    handleSizeChange (val) {
      this.tableControl.pageSize = val
      this.initFetch()
    },

    handleCurrentChange (val) {
      console.log(val)
      this.tableControl.pageCount = val
      this.initFetch()
    },

    handleEdit (row) {
      this.currentRowData = row
    },

    handleDelete (params) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // body
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    onUpdateSuccess () {
      this.initFetch()
    },

    onUserClick (username) {
      let userName = username || this.userInfo.username
      this.$router.push(`/member/${userName}`)
    },

    onCreaterClick (username) {
      this.$router.push(`/member/${username}`)
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

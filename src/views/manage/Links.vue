<template>
  <div class="wrapper" id="manage-links">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('unapproved')" name="first"></el-tab-pane>
              <el-tab-pane :label="$t('approved')" name="second"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="classify" :label="$t('linkClassifyStr')" width="100">
                <template scope="scope">
                  {{ $t(classifyList[scope.row.classify]['name']) }}
                </template>
              </el-table-column>
              <el-table-column prop="active" :label="$t('isActived')" width="100">
                <template scope="scope">
                  <el-tag :type="scope.row.active ? 'success' : 'error'">
                    {{ scope.row.active ? $t('yes') : $t('no') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createdBy" :label="$t('creater')" width="100">
                <template scope="scope">
                  <el-button type="text" @click="onCreaterClick(scope.row.createdBy)">
                    {{ scope.row.createdBy }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="theme" :label="$t('linkThemeStr')" width="100">
                <template scope="scope">
                {{ fillThemeName(scope.row.classify, scope.row.theme) }}
                </template>
              </el-table-column>
              <el-table-column prop="urlPath" :label="$t('linkAddressStr')" min-width="180">
                <template scope="scope">
                  <a class="title-link" :href="scope.row.urlPath" target="_blank">
                    {{ scope.row.title }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column prop="created" :label="$t('createdDateStr')" width="160">
                <template scope="scope">{{ scope.row.created | dateConvert }}</template>
              </el-table-column>
              <el-table-column :label="$t('operation')" width="160">
                <template scope="scope">
                  <el-button size="small"
                    @click="handleEdit(scope.row)">{{ $t('edit') }}</el-button>
                  <el-button size="small" type="danger"
                    @click="handleDelete(scope.row)">{{ $t('delete') }}</el-button>
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
    <edit-dialog
      v-model="isShowDlgFlag"
      :pdata="currentRowData"
      @update-success="onUpdateSuccess">
    </edit-dialog>
  </div>
</template>

<script>
import EditDialog from 'components/EditDialog'
import $config from 'config'
export default{
  name: 'ManageLinks',

  data () {
    return {
      isLoading: false,
      isShowDlgFlag: false,
      activeName: 'first',
      classifyList: $config.classify,
      themeList: $config.theme,
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
    EditDialog
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
      this.$apis.getAllLinks(params).then(result => {
        this.isLoading = false
        this.tableData = result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      }).finally(() => {
        this.isLoading = false
      })

      this.$apis.getAllLinksCount(params).then(result => {
        this.tableControl.totalCount = result
      }).catch((error) => {
        console.log(error)
      })
    },

    fillThemeName (classify, theme) {
      let result = ''
      this.themeList[classify].map(item => {
        if (item.value === theme) {
          result = item.key
        }
      })
      return result
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
      this.isShowDlgFlag = true
      this.currentRowData = row
    },

    handleDelete (params) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        params.operatorId = this.userInfo && this.userInfo._id

        this.isLoading = true
        this.$apis.deleteNiceLinks(params).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.initFetch()
          this.isLoading = false
        }).catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
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

#manage-links{
  .entry-list{
    width: 100%;
    padding: 15px;
    .classify-title{
      margin: 15px auto;
    }
  }
}
</style>

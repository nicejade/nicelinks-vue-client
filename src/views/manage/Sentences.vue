<template>
  <div class="wrapper" id="manage-sentences">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <el-button round icon="el-icon-plus" @click="isShowDlgFlag = true">
            {{ $t('shareNewSentences') }}
          </el-button>
          <div class="sentences-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('approved')" name="first"></el-tab-pane>
              <el-tab-pane :label="$t('unapproved')" name="second"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" stripe style="width: 100%;">
              <el-table-column
                prop="type"
                :label="$t('type')"
                width="100"
                :filters="sentencesTypeList"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag :class="scope.row.type + '-color'" disable-transitions
                    >{{ getSentenceTypeName(scope.row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                :label="$t('content')"
                show-overflow-tooltip
                min-width="100"
              >
              </el-table-column>
              <el-table-column prop="createdBy" :label="$t('creater')" width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="onCreaterClick(scope.row.createdBy)">
                    {{ scope.row.createdBy }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('createdDateStr')" width="160">
                <template slot-scope="scope">{{ scope.row.createTime | dateConvert }}</template>
              </el-table-column>
              <el-table-column :label="$t('operation')" width="160">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleEdit(scope.row)">{{
                    $t('edit')
                  }}</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.row)">{{
                    $t('delete')
                  }}</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="table-operate">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalCount"
                :current-page="tableControl.pageCount"
                :page-size="tableControl.pageSize"
                :page-sizes="[20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sentences-dialog
      v-model="isShowDlgFlag"
      :pdata="currentRowData"
      @update-success="onUpdateSuccess"
    />
  </div>
</template>

<script>
import SentencesDialog from 'components/dialog/SentencesDialog'
import $config from 'config'

export default {
  name: 'ManageSentences',

  data() {
    const vm = this
    return {
      title: vm.$t('manageSentences'),
      isLoading: false,
      isShowDlgFlag: false,
      activeName: 'first',
      tableData: [],
      totalCount: 0,
      tableControl: {
        pageCount: 1,
        pageSize: 20,
        sortType: -1,
        sortTarget: 'createTime',
      },
      currentRowData: {},
    }
  },

  components: {
    SentencesDialog,
  },

  computed: {
    sentencesTypeList() {
      return $config.sentences.map((item) => {
        return {
          text: item.text[this.$lang],
          value: item.value,
        }
      })
    },
  },

  created() {
    this.initFetch()
  },

  watch: {
    activeName(val) {
      this.initFetch()
    },
  },

  methods: {
    initFetch() {
      this.requestSentences()
      this.requestSentencesCount()
    },

    requestSentences() {
      let params = {}
      Object.assign(params, this.tableControl)
      params.active = this.activeName === 'first'

      this.isLoading = true
      this.$apis
        .getSentences(params)
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

    requestSentencesCount() {
      let params = {
        active: this.activeName === 'first',
      }
      this.$apis
        .getSentencesCount(params)
        .then((result) => {
          this.totalCount = result
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
    },

    fillThemeName(classify, theme) {
      let result = ''
      this.themeList[classify].map((item) => {
        if (item.value === theme) {
          result = item.key
        }
      })
      return result
    },

    getSentenceTypeName(type) {
      return this.sentencesTypeList.filter((item) => {
        return item.value === type
      })[0]['text']
    },

    handleClick() {},

    handleSizeChange(val) {
      this.tableControl.pageSize = val
      this.initFetch()
    },

    handleCurrentChange(val) {
      console.log(val)
      this.tableControl.pageCount = val
      this.initFetch()
    },

    handleEdit(row) {
      this.isShowDlgFlag = true
      this.currentRowData = row
    },

    handleDelete(params) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          params.operatorId = this.userInfo && this.userInfo._id

          this.isLoading = true
          this.$apis
            .removeSentences(params)
            .then((result) => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.initFetch()
              this.isLoading = false
            })
            .catch((error) => {
              this.isLoading = false
              this.$message.error(`${error}`)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    onUpdateSuccess() {
      this.initFetch()
    },

    onCreaterClick(username) {
      this.$router.push(`/member/${username}`)
    },
  },

  locales: {
    zh: {
      approved: '已审核',
      unapproved: '未审核',
      isActived: '是否已激活',
      creater: '创建者',
    },
  },
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';

#app #manage-sentences {
  .panel-body {
    padding-top: 15px;
  }
  .sentences-list {
    width: 100%;
    padding: 15px;
    .classify-title {
      margin: 15px auto;
    }
  }
}
</style>

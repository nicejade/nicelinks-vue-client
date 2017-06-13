<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr"></links-list>
            <div class="page-responsive" v-show="niceLinksArr.length">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableControl.pageCount"
                :page-sizes="[20, 50, 100]"
                :page-size="tableControl.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageTotal">
              </el-pagination>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
        <br>
      </div>
    </div>
    <inject-dialog v-model="isShowDlgFlag"></inject-dialog>
  </div>
</template>

<script>
import { $apis } from 'helper'
import { $config } from 'config'

import LinksList from 'components/LinksList'
import InjectDialog from 'components/InjectDialog'

export default {
  name: 'nicelinks',
  data () {
    return {
      isLoading: false,
      isShowDlgFlag: false,
      niceLinksArr: [],
      classifyList: $config.classify,
      pageTotal: 0,
      tableControl: {
        pageCount: 1,
        pageSize: 10,
        sortType: -1,
        sortTarget: ''
      }
    }
  },

  components: {
    InjectDialog,
    LinksList
  },

  created () {
    this.$bus.on('inject-success', this.fetchSearch)
    this.$bus.on('fetch-search', this.fetchSearch)
    this.$bus.on('switch-nav', this.switchNav)
    this.$bus.on('activate-inject-dlg', () => {
      this.isShowDlgFlag = true
    })
  },

  mounted () {
    this.fetchSearch()
  },

  methods: {
    fetchSearch (params = {}) {
      this.isLoading = true
      Object.assign(params, this.tableControl)
      $apis.getNiceLinks(params).then(result => {
        this.isLoading = false
        this.niceLinksArr = result
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
        this.$message.error(`${error}`)
        this.niceLinksArr = $config.default
      }).finally(() => {
        this.isLoading = false
      })
    },

    switchNav (target = '') {
      let params = {
        'classify': target
      }
      this.fetchSearch(params)
    },

    handleSortChange (obj) {
      console.log(obj)
      this.tableControl.sortTarget = obj.prop
      this.tableControl.sortType = obj.order === 'ascending' ? 1 : -1
      this.fetchSearch()
    },

    handleSizeChange (size) {
      this.tableControl.pageSize = size
      this.fetchSearch()
    },

    handleCurrentChange (val) {
      this.tableControl.pageCount = val
      this.fetchSearch()
    }
  }
}
</script>

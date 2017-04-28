<template>
  <div class="wrapper">
    <div class="panel-default nice-links-moulde" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="entry-list">
          <template>
            <el-table :data="niceLinksArr" @sort-change="handleSortChange">
              <el-table-column prop="like" :label="$t('beLikedStr')" width="180" sortable="custom">
                <template scope="scope">
                  <el-badge :value="scope.row.like || 0" class="liked-num">
                    <el-button type="text" size="small" @click="onLikeClick(scope.row)">
                      <icon class="icons" name="like">Like</icon>
                    </el-button>
                  </el-badge>
                </template>
              </el-table-column>
              <el-table-column prop="url_path" :label="$t('niceLinkStr')" width="180">
                <template scope="scope">
                  <a class="enter-link" :href="scope.row.url_path" target="_blank">{{ scope.row.title }}</a>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="classify" :label="$t('linkClassifyStr')" min-width="100">
                <template scope="scope">
                  <span> {{ classifyList[scope.row.classify].key }} </span>
                </template>
              </el-table-column> -->
              <el-table-column prop="tags" :label="$t('linkTagsStr')" min-width="180">
                <template scope="scope">
                  <el-tag type="gray" v-for="item in scope.row.tags.split(';')">{{ item }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="desc" :label="$t('linkDescStr')" min-width="180">
              </el-table-column>
              <el-table-column :label="$t('createdDateStr')" width="180">
                <template scope="scope">
                  <span>{{ scope.row.created | dateConvert }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="like" :label="$t('beDisikedStr')" width="180" sortable="custom">
                <template scope="scope">
                  <el-badge :value="scope.row.dislike || 0" class="liked-num">
                    <el-button type="text" size="small" @click="onDislikeClick(scope.row)">
                      <icon class="icons" name="dislike">Dislike</icon>
                    </el-button>
                  </el-badge>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
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
    </div>
    <inject-dialog v-model="isShowDlgFlag"></inject-dialog>
  </div>
</template>

<script>
import { $apis } from 'helper'
import { $config } from 'config'
import InjectDialog from 'components/InjectDialog'
import LinksList from 'components/LinksList'
import { Fingerprint2 } from 'assets/js/fingerprint2.min'

export default {
  name: 'nicelinks',
  data () {
    return {
      isLoading: false,
      isShowDlgFlag: false,
      niceLinksArr: [],
      classifyList: $config.classify,
      fingerprint: null,
      pageTotal: 0,
      tableControl: {
        pageCount: 1,
        pageSize: 10,
        sortType: -1,
        sortTarget: ''
      }
    }
  },

  created () {
    new Fingerprint2().get((result, components) => {
      this.fingerprint = result
    })

    this.$bus.on('inject-success', this.fetchSearch)
    this.$bus.on('switch-nav', this.switchNav)
    this.$bus.on('activate-inject-dlg', () => {
      this.isShowDlgFlag = true
    })
  },

  mounted () {
    this.fetchSearch()
  },

  components: {
    InjectDialog,
    LinksList
  },

  methods: {
    fetchSearch (params = { 'classify': '0' }) {
      this.isLoading = true
      Object.assign(params, this.tableControl)
      $apis.getNiceLinks(params).then(result => {
        this.isLoading = false
        this.niceLinksArr = result
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
        this.$message.error(`${error}`)
      })
    },

    switchNav (target) {
      let params = {
        'classify': target
      }
      this.fetchSearch(params)
    },

    dispatchAction (row, action) {
      let params = {
        'fingerprint': this.fingerprint,
        '_id': row._id,
        'action': action
      }
      $apis.dispatchAction(params).then(result => {
        row[action] = result.count
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      })
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
    },

    onLikeClick (row) {
      this.dispatchAction(row, 'like')
    },

    onDislikeClick (row) {
      this.dispatchAction(row, 'dislike')
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";

.nice-links-moulde{
  background-color: #f0f0f4;
  position: absolute;
  width: 100%;
  margin-top: $header-height;
  .entry-list{
    margin: auto;
    .enter-link{
      color: $color-enter-link;
    }
    .liked-num{
      margin-right: 20px;
      .icons{
        width: 22px;
        height: 22px;
        margin: 0;
      }
    }
  }
}
</style>

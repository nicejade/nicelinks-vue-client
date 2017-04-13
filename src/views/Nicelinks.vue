<template>
  <div class="wrapper">
    <div class="panel-default nice-links-moulde">
      <div class="panel-body">
        <div class="entry-list">
          <template>
            <el-table :data="niceLinksArr" style="width: 100%">
              <el-table-column prop="like" :label="$t('beLikedStr')" min-width="180">
                <template scope="scope">
                  <el-badge :value="scope.row.like || 0" class="liked-num">
                    <el-button type="text" size="small" @click="onLikeClick(scope.row)">
                      <icon class="icons" name="like">Like</icon></el-button>
                  </el-badge>
                  <el-badge :value="scope.row.dislike || 0" class="liked-num">
                    <el-button type="text" size="small" @click="onDislikeClick(scope.row)">
                      <icon class="icons" name="dislike">Dislike</icon></el-button>
                  </el-badge>
                </template>
              </el-table-column>
              <el-table-column prop="url_path" :label="$t('niceLinkStr')" width="180">
                <template scope="scope">
                  <a class="enter-link" :href="scope.row.url_path" target="_blank">{{ scope.row.title }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="classify" :label="$t('linkClassifyStr')" min-width="100">
                <template scope="scope">
                  <span> {{ classifyList[scope.row.classify].key }} </span>
                </template>
              </el-table-column>
              <el-table-column prop="tags" :label="$t('linkTagsStr')" min-width="200">
                <template scope="scope">
                  <el-tag type="gray" v-for="item in scope.row.tags.split(';')">{{ item }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="desc" :label="$t('linkDescStr')" width="180">
              </el-table-column>
              <el-table-column :label="$t('createdDateStr')" width="180">
                <template scope="scope">
                  <span>{{ scope.row.created | dateConvert }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $apis } from 'helper'
import { $config } from 'config'
import { Fingerprint2 } from 'assets/js/fingerprint2.min'

export default {
  name: 'nicelinks',
  data () {
    return {
      niceLinksArr: [],
      classifyList: $config.classify,
      fingerprint: null
    }
  },

  created () {
    new Fingerprint2().get((result, components) => {
      this.fingerprint = result
    })

    this.$bus.on('inject-success', this.initFetch)
    this.$bus.on('switch-nav', this.switchNav)
  },

  mounted () {
    this.initFetch()
  },

  methods: {
    initFetch () {
      $apis.getNiceLinks().then(result => {
        this.niceLinksArr = result
      })
    },

    switchNav (index) {
    },

    dispatchAction (row, action) {
      let params = {
        'fingerprint': this.fingerprint,
        '_id': row._id,
        'action': action
      }
      $apis.dispatchAction(params).then(result => {
        row[action] = result.likeNum
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      })
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

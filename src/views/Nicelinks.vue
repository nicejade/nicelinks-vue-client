<template>
  <div class="wrapper">
    <div class="panel-default nice-links-moulde">
      <div class="panel-body">
        <div class="entry-list">
          <template>
            <el-table :data="niceLinksArr" style="width: 100%">
              <el-table-column prop="like" :label="$t('beLikedStr')" min-width="100">
                <template scope="scope">
                  <p>{{ scope.row.like || 0 }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="url_path" :label="$t('niceLinkStr')" width="180">
                <template scope="scope">
                  <a class="enter-link" :href="scope.row.url_path" target="_blank">{{ scope.row.title }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="classify" :label="$t('linkClassifyStr')" min-width="100">
              </el-table-column>
              <el-table-column prop="tags" :label="$t('linkTagsStr')" width="180">
                <template scope="scope">
                  <el-tag type="gray" v-for="item in scope.row.tags">{{ item }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="desc" :label="$t('linkDescStr')" width="180">
              </el-table-column>
              <el-table-column :label="$t('createdDateStr')" width="180">
                <template scope="scope">
                  <span>{{ scope.row.created_at  }}</span>
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

export default {
  name: 'nicelinks',
  data () {
    return {
      niceLinksArr: []
    }
  },

  mounted () {
    $apis.getNiceLinks().then(result => {
      console.log(result)
      this.niceLinksArr = result
    })
  },

  methods: {
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
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="panel-default nice-links-moulde">
      <div class="panel-body">
        <div class="entry-list">
          <template>
            <el-table :data="niceLinksArr" style="width: 100%">
              <el-table-column prop="url_path" label="博客地址" width="180">
                <template scope="scope">
                  <a class="enter-link" :href="scope.row.url_path" target="_blank">{{ scope.row.title }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="相关描述" width="180">
              </el-table-column>
              <el-table-column prop="tags" label="标签" width="180">
              </el-table-column>
              <el-table-column prop="created" label="创建日期" width="180">
              </el-table-column>
              <el-table-column prop="like" label="欢喜程度">
                <template scope="scope">
                  <p>{{ scope.row.like || 0 }}</p>
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
  position: absolute;
  margin-top: $header-height;
  .entry-list{
    margin: auto;
    .enter-link{
      color: $color-enter-link;
    }
  }
}
</style>

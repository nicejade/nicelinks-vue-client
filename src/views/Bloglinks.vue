<template>
  <div class="content theme-jade-color">
    <div class="wrapper">
      <inject-blog></inject-blog>
      <div class="entry-list">
        <template>
          <el-table :data="niceBlogArr" style="width: 100%">
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
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { $apis } from 'helper'
import InjectBlog from 'components/InjectBlog'

export default {
  name: 'bloglinks',
  data () {
    return {
      niceBlogArr: []
    }
  },

  mounted () {
    $apis.getNiceBlog().then(result => {
      console.log(result)
      this.niceBlogArr = result
    })
  },

  components: {
    InjectBlog
  },

  methods: {
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
@import "./../assets/scss/mixins.scss";

.entry-list{
  margin: auto;
  .enter-link{
    color: $color-enter-link;
  }
}
</style>

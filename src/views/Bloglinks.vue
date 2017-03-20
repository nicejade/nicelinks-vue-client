<template>
<div class="content theme-jade-color">
  <div class="wrapper">
    <ul class="entry-list">
      <li v-for="item in niceBlogArr" class="item">
        <div class="entry">
          <a href="item.url_path" class="enter-link">
            <div class="conetnt-box">
              <div class="info">
                <a :href="item.url_path" target="_black">{{ item.title }}</a>
              </div>
              <div>{{ item.desc }}</div>
            </div>
          </a>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { $apis } from 'helper'

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
  },

  methods: {
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
@import "./../assets/scss/mixins.scss";

.entry-list{
  padding: 1rem 1.5rem;
  .item{
    .entry{
      .enter-link{
        color: $color-enter-link;
        .conetnt-box{
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          padding: .5rem 0;
        }
      }
    }
  }
}
</style>

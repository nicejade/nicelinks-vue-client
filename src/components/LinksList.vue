<template>
<div class="links-list">
  <div class="moudle" v-for="(item, index) in pdata">
    <div class="content">
      <h3 class="title">
        <a  class="title-link" :href="item.url_path" target="_blank">{{ item.title }}</a>
      </h3>
      <div class="meta">
        <span>{{ item.created | dateConvert }}</span>
      </div>
      <div class="user-info">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'LinksList',
  data () {
    return {
    }
  },

  props: {
    pdata: {
      type: [Array, Object],
      default: []
    }
  },

  components: {
  },

  methods: {
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
.links-list{
  .moudle{
    margin: 5px;
    text-align: left;
    border-bottom: 1px dashed #e3ecec;
    .content{
      margin: 5px;
      .title{
        margin: 5px;
        .title-link{
          font-size: 1em;
          text-decoration: none;
          color: $link-title;
          &:hover{
            color: $link-title-hover;
          }
        }
      }
      .meta{
        margin: 5px;
      }
    }
  }
}
</style>

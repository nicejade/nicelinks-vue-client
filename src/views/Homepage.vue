<template>
<div class="content">
  <!-- <header-nav></header-nav> -->
  <div class="page-wrapper">
    <h1><a href="http://www.jeffjade.com" class="main-site" :title="title"></a></h1>
    <contact></contact>
  </div>
</div>
</template>

<script>
import HeaderNav from './../components/HeaderNav'
import Contact from './../components/Contact'

export default {
  name: 'homepage',
  data () {
    return {
      title: '晚晴幽草轩'
    }
  },
  components: {
    HeaderNav,
    Contact
  }
}
</script>

<style>
.main-site{
  color: #fafafa;
  display: block;
  background: url('./../assets/images/jade_blog_title.png');
  background-size: 100% 100%;
  width: 8.563em;
  height: 2em;
  text-decoration: none;
  margin: auto;
}
</style>

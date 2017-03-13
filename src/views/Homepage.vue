<template>
<div class="content theme-color-grey-blue">
  <!-- <header-nav></header-nav> -->
  <div class="page-wrapper">
    <h1><a href="http://www.jeffjade.com" class="main-site" :title="title"></a></h1>
    <!-- <div class="container">
      <a href="javascript:;" class="button" @click="onContactMeClick">Contact Me</a>
    </div> -->
    <contact></contact>
    <reward-me></reward-me>
  </div>
</div>
</template>

<script>
import HeaderNav from './../components/HeaderNav'
import Contact from './../components/Contact'
import RewardMe from './../components/RewardMe'

export default {
  name: 'homepage',
  data () {
    return {
      title: '晚晴幽草轩'
    }
  },
  components: {
    HeaderNav,
    Contact,
    RewardMe
  }
}
</script>

<style>
.main-site{
  color: #fafafa;
  display: block;
  background: url('./../assets/images/jade_blog_title.png');
  background-size: 100% 100%;
  width: 12.8445em;
  height: 3em;
  text-decoration: none;
  margin: auto;
}
</style>

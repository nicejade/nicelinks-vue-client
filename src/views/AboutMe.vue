<template>
<div class="wrapper theme-jade-color">
  <div class="home-wrapper">
    <h1><a href="http://jeffjade.com" class="main-site" :title="title">
      <img class="main-site-img" src="../assets/images/jade_blog_title.png" alt="">
    </a></h1>
    <div class="container">
      <a href="javascript:;" class="button" @click="onBlogLinksClick">Nice Links</a>
    </div>
    <contact></contact>
    <reward-me></reward-me>
  </div>
</div>
</template>

<script>
import Contact from 'components/Contact'
import RewardMe from 'components/RewardMe'

export default {
  name: 'homepage',
  data () {
    return {
      title: 'Nice Links'
    }
  },

  components: {
    Contact,
    RewardMe
  },

  methods: {
    onBlogLinksClick () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/mixins.scss";

.main-site{
  color: #fafafa;
  display: block;
  width: 12.8445em;
  height: 3em;
  text-decoration: none;
  margin: auto;
}

.main-site-img{
  width: 100%;
}

.home-wrapper{
  @include flex-box-center;
  width: 100%;
  height: 90%;
  flex-direction: column;
  text-align: center;
}
</style>

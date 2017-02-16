<template>
  <div class="homepage">
    <h1><a href="http://www.jeffjade.com" class="main-site">{{ title }}</a></h1>
    <links></links>
  </div>
</template>

<style>
  .homepage{
    position: absolute;
    top: 61.8%;
    left: 61.8%;
    text-align: center;
  }
  .main-site{
    color: #fafafa;
    font-size: 1em;
    text-decoration: none;
  }
</style>

<script>
import Links from './../components/Links'

export default {
  name: 'homepage',
  data () {
    return {
      title: '晚晴幽草轩'
    }
  },
  components: {
    Links
  }
}
</script>

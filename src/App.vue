<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/scss/style.scss'
import 'mixins/globalMixin'

export default {
  name: 'app',

  data () {
    return {
      title: 'Nice Links'
    }
  },

  created () {
    console.log('Welcome To %c' + this.title,
      `font-size:5em;
      background-color: #666666;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: rgba(255,255,255,0.6) 0px 3px 3px;`)
  }
}
</script>

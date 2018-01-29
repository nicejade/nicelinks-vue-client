<template>
  <div id="app">
    <!-- <v-touch v-on:swipeleft="onSwipeLeft"
      v-on:swiperight="onSwipeRight"
      v-bind:swipe-options="{ direction: 'horizontal', threshold: 120 }">
    </v-touch> -->
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/element/index.css'
import './assets/scss/style.scss'

export default {
  name: 'app',

  data () {
    return {
    }
  },

  methods: {
    onSwipeLeft () {
      this.$router.go(-1)
    },

    onSwipeRight () {
      this.$router.go(1)
    }
  }
}
</script>

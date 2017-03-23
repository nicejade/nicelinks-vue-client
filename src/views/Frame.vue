<template>
  <div class="page-wrap">
    <header-nav></header-nav>
    <main @click="hideMenu" class="main">
      <!-- <transition name="fade"></transition> -->
      <router-view  :key="$route.path"></router-view>
    </main>
  </div>
</template>

<script>
import HeaderNav from 'components/HeaderNav'

export default {
  name: 'homepage',
  data () {
    return {
      title: '晚晴幽草轩'
    }
  },

  components: {
    HeaderNav
  },

  methods: {
    hideMenu () {
      document.getElementById('app').className = ''
    }
  }
}
</script>

<style lang="scss">
</style>

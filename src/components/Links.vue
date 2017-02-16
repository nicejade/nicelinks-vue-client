<template>
  <div class="social-links">
    <a v-for="item in linksArray"
      :href="item.path"
      :title="item.title"
      :class="item.class"
      target="_blank"
      class="fa-2x">
    </a>
  </div>
</template>

<script>
import linksConfig from './../config/linksConfig'

export default {
  name: 'links',
  data () {
    return {
      linksArray: linksConfig
    }
  }
}
</script>

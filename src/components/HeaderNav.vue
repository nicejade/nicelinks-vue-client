<template>
<header class="header">
  <nav class="nav">
    <li class="nav-menu-item" v-for="item in linksArray">
      <a :href="item.path"
        :title="item.title"
        target="_blank">{{ item.name }}
      </a>
    </li>
  </nav>
</header>
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

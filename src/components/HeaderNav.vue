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
export default {
  name: 'links',
  data () {
    return {
      linksArray: []
    }
  }
}
</script>

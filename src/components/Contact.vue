<template>
  <div class="social-links">
    <a v-for="item in contactArray"
      :href="item.path + item.name"
      :title="item.title"
      :class="item.class"
      target="_blank"
      class="fa-2x">
    </a>
  </div>
</template>

<script>
import contactConfig from './../config/contactConfig'

export default {
  name: 'contract',
  data () {
    return {
      contactArray: contactConfig
    }
  }
}
</script>

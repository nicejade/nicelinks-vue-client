<template>
  <div class="markdown-body" v-html="beParsedVal" />
</template>

<script>
import marked from 'marked'
import './markdown.css'

export default {
  name: 'PreviewMd',

  computed: {
    beParsedVal() {
      return marked(this.value, {
        sanitize: true,
      })
    },
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  }
}
</script>

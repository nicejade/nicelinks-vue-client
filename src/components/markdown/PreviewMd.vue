<template>
  <div class="markdown-body" v-html="beParsedVal" />
</template>

<script>
import { parse } from 'helper/marked'
import './markdown.css'

export default {
  name: 'PreviewMd',

  computed: {
    beParsedVal() {
      return parse(this.value)
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

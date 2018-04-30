<template>
  <div class="preview-area markdown-body"
    v-html="beParsedVal">
  </div>
</template>

<script>
import marked from 'marked'
import './markdown.css'

export default {
  name: 'PreviewMd',

  data () {
    return {
    }
  },

  computed: {
    beParsedVal () {
      return marked(this.value, {
        sanitize: true
      })
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";

.preview-area{
  padding: 0 15px;
}
</style>

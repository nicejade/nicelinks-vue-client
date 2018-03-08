export default {
  data () {
    const vm = this
    return {
      title: vm.$t('niceLinksStr'),
      keywords: vm.$t('keywords'),
      description: vm.$t('description')
    }
  },

  metaInfo () {
    return {
      title: this.title,
      titleTemplate: '%s | ' + this.$t('niceLinksStr'),
      meta: [
        { name: 'title', content: this.title + ' | ' + this.$t('niceLinksStr') },
        { name: 'keywords', content: this.keywords },
        { vmid: 'description', name: 'description', content: this.description }
      ]
    }
  },

  mounted () {
  },

  methods: {
  }
}

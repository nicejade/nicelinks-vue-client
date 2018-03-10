export default {
  data () {
    const vm = this
    return {
      title: vm.$t('niceLinksStr'),
      siteTitle: vm.$t('niceLinksStr'),
      titleTemplate: '%s | ' + this.$t('niceLinksStr'),
      keywords: vm.$t('keywords'),
      description: vm.$t('description')
    }
  },

  created () {
  },

  metaInfo () {
    return {
      title: this.title,
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${this.siteTitle}` : `${this.siteTitle}`
      },
      meta: [
        { name: 'title', content: this.title ? `${this.title} - ${this.siteTitle}` : `${this.siteTitle}` },
        { name: 'keywords', content: this.keywords },
        { vmid: 'description', name: 'description', content: this.description }
      ]
    }
  },

  mounted () {
  },

  methods: {
    updatePageTitle () {
    }
  }
}

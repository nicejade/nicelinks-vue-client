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
    const titleContent = this.createTitleContent(this.title)
    return {
      title: this.title,
      titleTemplate: (titleChunk) => {
        return this.createTitleContent(titleChunk)
      },
      meta: [
        { vmid: 'title', name: 'title', content: titleContent },
        { vmid: 'keywords', name: 'keywords', content: this.keywords },
        { vmid: 'description', name: 'description', content: this.description },
        { vmid: 'og:title', property: 'og:title', content: titleContent },
        { vmid: 'og:keywords', name: 'og:keywords', content: this.keywords },
        { vmid: 'og:description', property: 'og:description', content: this.description }
      ]
    }
  },

  mounted () {
  },

  methods: {
    createTitleContent (titleChunk) {
      return titleChunk ? `${titleChunk} - ${this.siteTitle}` : `${this.siteTitle}`
    }
  }
}

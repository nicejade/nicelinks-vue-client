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
    const titleContent = this.title ? `${this.title} - ${this.siteTitle}` : `${this.siteTitle}`
    return {
      title: this.title,
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${this.siteTitle}` : `${this.siteTitle}`
      },
      meta: [
        { vmid: 'title', name: 'title', content: titleContent },
        { vmid: 'keywords', name: 'keywords', content: this.keywords },
        { vmid: 'description', name: 'description', content: this.description },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { vmid: 'og:title', property: 'og:title', content: titleContent },
        { vmid: 'og:image', property: 'og:image', content: 'https://static.nicelinks.site/static/img/favicons/favicon.png' },
        { vmid: 'og:keywords', property: 'og:keywords', content: this.keywords },
        { vmid: 'og:description', property: 'og:description', content: this.description }
      ]
    }
  },

  mounted () {
  },

  methods: {
  }
}

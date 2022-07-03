<template>
  <div id="post-page" class="wrapper">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArr" :is-loading="isLoading" />
            <SimilarRecommend :pdata="niceLinksArr[0]" />
            <div id="waline"></div>
          </div>
          <aside-list :index="index"></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimilarRecommend from 'components/SimilarRecommend'

export default {
  name: 'Post',

  data() {
    return {
      isLoading: true,
      niceLinksArr: [],
      niceLinksDetail: {},
      index: 0,
    }
  },

  watch: {},

  components: {
    SimilarRecommend,
  },

  created() {
    this.fetchPostData()
  },

  mounted() {},

  destroyed() {
    this.removeHeaderNavActive()
  },

  methods: {
    fetchPostData() {
      let params = {}
      params._id = this.$route.params.id
      params.userId = this.userInfo && this.userInfo._id ? this.userInfo._id : ''
      this.$apis
        .getNiceLinks(params)
        .then((result) => {
          if (result[0]) {
            this.niceLinksArr = Object.freeze(result)
            this.niceLinksDetail = Object.freeze(result[0])

            this.updatePageSentence()
            this.$nextTick(() => {
              this.updatePageMeta(this.niceLinksDetail)
              this.addCanonicalForSEO(this.niceLinksDetail)
              this.addHeaderNavActive()
              // Add Waline Comment Functions @2022.01.17~18
              this.$nextTick(() => {
                this.$util.addWalineComment()
              })
            })
          } else {
            this.$router.push('/404')
          }
        })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    updatePageMeta(details) {
      details.keywords ? (this.keywords = details.keywords) : ''
      this.description = details.desc

      document.title = `${details.title} | 倾城之链`
      const descNode = document.querySelector('meta[name="description"]')
      descNode.setAttribute('content', this.description)

      const tDescNode = document.querySelector('meta[name="twitter:description"]')
      tDescNode.setAttribute('content', this.description)
    },

    addCanonicalForSEO(details) {
      let link = document.querySelector("link[rel='canonical']")
      link = !!link ? link : document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', `https://nicelinks.site/post/${details._id}`)
      document.head.appendChild(link)
    },

    updatePageSentence() {
      const createTime = new Date(this.niceLinksDetail.created)
      const startTime = new Date('2017-09-14')
      const offsetTime = createTime.getTime() - startTime.getTime()
      this.index = Math.ceil(offsetTime / 1296000000) // (15 * 24 * 60 * 60 * 1000)
    },

    addHeaderNavActive() {
      const classify = +this.niceLinksDetail.classify
      const navItemNodes = document.getElementsByClassName('nav-item')
      if (navItemNodes && navItemNodes[classify] && navItemNodes[classify].classList) {
        navItemNodes[classify].classList.add('active')
      }
    },

    removeHeaderNavActive() {
      const classify = +this.niceLinksDetail.classify
      const navItemNodes = document.getElementsByClassName('nav-item')
      if (navItemNodes && navItemNodes[classify] && navItemNodes[classify]) {
        navItemNodes[classify].classList.remove('active')
      }
    },

    createShareContent(item = {}) {
      let defaultStr = `我在 #倾城之链# 发现优质网站 —— @NAME：@URL (@DESC)；欢迎前来围观、品评。`
      let resultText = defaultStr.replace('@NAME', item.title || '')
      const urlPath = `${item.urlPath}?utm_source=nicelinks.site`
      resultText = resultText.replace('@URL', urlPath || '')
      return resultText.replace('@DESC', item.desc || '')
    },

    createShareTags(item = {}) {
      let defaultTagsStr = 'Skill,Resource,Life,Information'
      return item.tags ? item.tags.join(',') : defaultTagsStr
    },
  },
}
</script>

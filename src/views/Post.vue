<template>
  <div id="post-page" class="wrapper">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArrayay" :is-loading="isLoading">
              <social-share slot="link-share"
                :share-url="currentPath"
                :share-content="createShareContent(niceLinksDetail)"
                :hashtags="createShareTags(niceLinksDetail)">
              </social-share>
            </links-list>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialShare from 'components/SocialShare'
import metaMixin from 'mixins/metaMixin.js'

export default {
  name: 'Post',

  mixins: [metaMixin],

  data () {
    return {
      isLoading: true,
      niceLinksArrayay: [],
      niceLinksDetail: {},
      currentPath: window.document.location.href,
      shareTitle: ''
    }
  },

  watch: {
  },

  components: {
    SocialShare
  },

  created () {
  },

  mounted () {
    let params = {}
    params._id = this.$route.params.id
    params.userId = this.userInfo && this.userInfo._id || ''
    this.$apis.getNiceLinks(params).then(result => {
      if (result[0]) {
        this.niceLinksArrayay = result
        this.niceLinksDetail = result[0]

        this.updatePageTitle(result[0])
      } else {
        this.$router.push('/404')
      }
    }).catch((error) => {
      this.isLoading = false
      this.$message.error(`${error}`)
    }).finally(() => {
      this.isLoading = false
    })
  },

  methods: {
    updatePageTitle (details) {
      this.title = details.title
      details.keywords ? this.keywords = details.keywords : ''
      this.description = details.desc
    },

    createShareContent (item = {}) {
      let defaultStr = `我在 #倾城之链# 发现优质网站 —— @NAME：@URL (@DESC)；欢迎前来围观、品评。`
      let resultText = defaultStr.replace('@NAME', item.title || '')
      resultText = resultText.replace('@URL', item.urlPath || '')
      return resultText.replace('@DESC', item.desc || '')
    },

    createShareTags (item = {}) {
      let defaultTagsStr = 'Skill,Resource,Life,Information'
      return item.tags ? item.tags.join(',') : defaultTagsStr
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";

.link-desc{
  color: $silver-grey;
  margin: 15px auto;
  padding-left: 10px;
  word-break: break-all;
  line-height: 1.8rem;
  font-size: $font-small;
  word-spacing: 3px;
  border-left: 2px solid #000000;
}
.link-keywords,
.link-review{
  margin: 15px 0;
  color: $black-grey;
  line-height: 1.8rem;
  strong{
    font-weight: 700;
    color: $link-title;
  }
}
</style>

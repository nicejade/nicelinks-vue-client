<template>
  <div id="post-page" class="wrapper">
    <div class="panel-default">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <links-list :pdata="niceLinksArray" :is-loading="isLoading">
              <div slot="link-keywords"
                class="link-keywords"
                v-if="niceLinksDetail.keywords">
                <strong>{{$t('keywordStr')}}</strong>
                {{niceLinksDetail.keywords}}
              </div>
              <div
                slot="link-desc"
                class="link-desc"
                v-html="this.obtainLinkDesc(niceLinksDetail)">
              </div>
              <social-share slot="link-share"
                :share-url="currentPath"
                :share-content="makeShareContent(niceLinksDetail)"
                :hashtags="makeShareTags(niceLinksDetail)">
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

export default {
  name: 'Post',

  data () {
    return {
      isLoading: true,
      niceLinksArray: [],
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
        this.niceLinksArray = result
        this.niceLinksDetail = result[0]
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
    makeShareContent (item = {}) {
      let defaultStr = `我在 #倾城之链# 发现绝好网站 —— @NAME：@URL (@DESC)；欢迎前来围观、品评。`
      let resultText = defaultStr.replace('@NAME', item.title || '')
      resultText = resultText.replace('@URL', item.urlPath || '')
      return resultText.replace('@DESC', item.desc || '')
    },

    makeShareTags (item = {}) {
      let defaultTagsStr = 'Skill,Resource,Life,Information'
      return item.tags ? item.tags.join(',') : defaultTagsStr
    },

    obtainLinkDesc (item = {}) {
      return item.desc ? item.desc.split('\n').join('<br>') : ''
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";

.link-desc{
  color: $silver-grey;
  border-left: 2px solid #000000;
  margin: 15px auto;
  padding-left: 10px;
  word-break: break-all;
  line-height: 1.8rem;
  font-size: $font-small;
  word-spacing: 3px;
}
.link-keywords{
  margin: 15px 0;
  color: $black-grey;
  line-height: 1.8rem;
  strong{
    font-weight: 700;
    color: $link-title;
  }
}
</style>

<template>
  <div id="awesome-sentence" class="awesome-sentence">
    <div class="lined-paper" v-show="currentSentenceStr" v-loading="isLoading">
      <preview-md id="sentence" :value="currentSentenceStr || $t('noFill')" />
    </div>
    <div class="btn-group">
      <el-button class="common-btn" @click="onPreviousClick">
        <icon class="icon" name="previous"></icon>
      </el-button>
      <el-button class="common-btn button-ripple" :class="btnClassName" @click="onRandomClick">
        <icon class="icon" name="random"></icon>
      </el-button>
      <el-button class="common-btn" @click="onCopy2ClipboardClick">
        <icon class="icon" name="copy"></icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import PreviewMd from 'components/markdown/PreviewMd.vue'

export default {
  name: 'AwesomeSentence',

  data() {
    return {
      isLoading: false,
      isCanLookBack: false,
      currentSentenceStr: '',
      lastSentenceStr: '',
      currentSentence: {},
    }
  },

  props: {
    sentence: {
      type: [Object],
      default: '',
    },
    index: {
      type: [Number],
      default: 1,
    },
  },

  computed: {
    btnClassName() {
      const sentenceType = this.currentSentence.type
      return `${sentenceType}-colors`
    },
    currentSentenceStr() {
      return this.currentSentence.content || this.sentence.content
    },
  },

  components: {
    PreviewMd,
  },

  mounted() {},

  watch: {
    'sentence.content': function (val = '') {
      this.currentSentenceStr = val
      this.lastSentenceStr = val
    },
    index: function (val = 1) {
      this.updateSentence(val)
    },
  },

  methods: {
    copyToClipboard(content) {
      const el = document.createElement('textarea')
      el.value = content
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },

    copyToIosClipboard(content) {
      window.getSelection().removeAllRanges()
      const node = document.getElementById('sentence')
      const range = document.createRange()
      range.selectNode(node)
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    },

    /* ---------------------Click Event--------------------- */
    onPreviousClick() {
      if (!this.isCanLookBack) {
        return this.$message({
          type: 'info',
          message: `错过，许是永恒，只可回首前一条`,
        })
      }
      this.currentSentenceStr = this.lastSentenceStr
      this.isCanLookBack = false
    },

    onRandomClick() {
      this.isLoading = true
      this.$apis
        .getRandomSentence()
        .then((result) => {
          this.lastSentenceStr = this.currentSentenceStr
          this.isCanLookBack = true
          this.currentSentence = result || {}
          this.currentSentenceStr = result.content
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    updateSentence(index) {
      const params = {
        pageCount: index,
        pageSize: 1,
        sortType: 1,
        active: true,
        sortTarget: 'createTime',
      }
      this.$apis
        .getSentences(params)
        .then((result) => {
          if (!result || result.length === 0) return

          this.lastSentenceStr = this.currentSentenceStr
          this.isCanLookBack = true
          this.currentSentence = result[0] || {}
          this.currentSentenceStr = result[0].content
        })
        .catch((error) => {
          console.log(error)
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    onCopy2ClipboardClick() {
      const tempStr = marked(this.currentSentenceStr, {}) + `── 倾城之链 · 箴言锦语`
      const content = tempStr.replace(/<[^>]*>/g, '')
      this.$util.isIosSystem() ? this.copyToIosClipboard(content) : this.copyToClipboard(content)
      this.$message({
        type: 'success',
        message: `已将此条「锦语」复制到您的剪切板`,
      })
    },
  },
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';

.awesome-sentence {
  margin: 0 15px;
  margin-bottom: -10px;
  .lined-paper {
    width: 100%;
    margin: 0 auto;
    padding: 6px 10px;
    position: relative;
    color: #444;
    text-align: left;
    line-height: 26px;

    background: #fff;
    background: -webkit-linear-gradient(top, $border-grey 0%, $white 6%) 0 6px;
    -webkit-background-size: 100% 26px;
    -moz-background-size: 100% 26px;
    -ms-background-size: 100% 26px;
    -o-background-size: 100% 26px;
    background-size: 100% 26px;
    div,
    p {
      line-height: 26px;
    }
    div:last-child,
    p:last-child {
      margin: 0;
    }
  }
  .btn-group {
    margin-top: 10px;
    .common-btn {
      display: inline-block;
      position: relative;
      width: 4.3rem;
      height: 4.3rem;
      vertical-align: middle;
      text-align: center;
      border: 1px solid #efefef;
      border-radius: 50%;
      margin: 0 15px;
      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>

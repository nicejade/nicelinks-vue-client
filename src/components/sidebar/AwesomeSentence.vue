<template>
  <div id="awesome-sentence" class="awesome-sentence">
    <div class="lined-paper" v-show="sentenceStr">
      <preview-md :value="sentenceStr || $t('noFill')" />
    </div>
    <el-tooltip :content="$t('randomTip')" placement="top">
      <el-button @click="onRandomClick" type="text">
        <icon name="random"></icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import PreviewMd from 'components/markdown/PreviewMd.vue'

export default {
  name: 'AwesomeSentence',

  data () {
    return {
      currantSentence: {}
    }
  },

  props: {
    sentence: {
      type: [Object],
      default: ''
    }
  },

  computed: {
    sentenceStr () {
      return this.currantSentence.content || this.sentence.content
    }
  },

  components: {
    PreviewMd
  },

  mounted () {
  },

  methods: {
    onRandomClick () {
      this.$apis.getRandomSentence().then(result => {
        this.currantSentence = result || {}
      }).catch((error) => {
        this.$message.error(`${error}`)
      })
    }
  },

  locales: {
    en: {
      randomTip: 'Random Update'
    },
    zh: {
      randomTip: '随机更新'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";

.awesome-sentence{
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
    div, p{
      line-height: 26px;
    }
    div:last-child, p:last-child {
      margin: 0;
    }
  }
  .el-button{
    padding: 0;
    .icon-random{
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>

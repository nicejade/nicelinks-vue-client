<template>
  <div class="links-list">
    <el-card shadow="hover" v-if="pdata.length <= 0">
      <div class="content">
        <el-card class="tip-box-card" v-if="!isLoading">
          <div slot="header" class="clearfix">
            <h4>{{ $t('warmReminder') }}</h4>
          </div>
          <div class="no-result-tip" v-html="$t('noResultTip')"></div>
        </el-card>
        <content-placeholder v-else slot="link-desc" :rows="placeholderRows"> </content-placeholder>
      </div>
    </el-card>
    <el-card
      :class="cardClassName"
      shadow="hover"
      key="index"
      v-for="(item, index) in pdata"
      v-if="pdata.length > 0"
    >
      <router-link :to="getAssembleRoute(item)" v-if="isAbstract">
        <LinkItem :item="item" :is-abstract="isAbstract"> </LinkItem>
      </router-link>
      <LinkItem v-else :item="item" :is-abstract="isAbstract"></LinkItem>
      <slot name="link-share"></slot>
    </el-card>
    <div class="advert-area">
      <img
        src="https://image.nicelinks.site/倾城之链-Banner.png"
        onerror="javascript:this.src='https://s1.ax1x.com/2020/07/09/UnsWdg.png';"
        alt="倾城之链：云集世间优秀站点"
      />
    </div>
  </div>
</template>

<script>
import ContentPlaceholder from 'vue-content-placeholder'
import LinkItem from './LinkItem.vue'

export default {
  name: 'LinksList',
  data() {
    return {
      placeholderRows: [
        {
          height: '2rem',
          boxes: [[0, '30%']],
        },
        {
          height: '1rem',
          boxes: [[0, 0]],
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']],
        },
        {
          height: '1rem',
          boxes: [[0, 0]],
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']],
        },
        {
          height: '2rem',
          boxes: [[0, 0]],
        },
        {
          height: '2rem',
          boxes: [[0, '88%']],
        },
        // show again - segmenting placeholder Start
        {
          height: '2rem',
          boxes: [[0, 0]],
        },
        // show again - segmenting placeholder End
        {
          height: '2rem',
          boxes: [[0, '30%']],
        },
        {
          height: '1rem',
          boxes: [[0, 0]],
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']],
        },
        {
          height: '1rem',
          boxes: [[0, 0]],
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']],
        },
        {
          height: '2rem',
          boxes: [[0, 0]],
        },
        {
          height: '2rem',
          boxes: [[0, '88%']],
        },
      ],
    }
  },

  props: {
    pdata: {
      type: [Array, Object],
      default: () => {
        return []
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isAbstract: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cardClassName() {
      return this.isAbstract ? 'single-moudle' : ''
    },
  },

  components: {
    LinkItem,
    ContentPlaceholder,
  },

  created() {},

  methods: {
    getAssembleRoute(item) {
      return `/post/${item._id}`
    },
  },
}
</script>

<style media="screen" lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.main {
  .links-list {
    .single-moudle {
      &:hover {
        background-color: $white-grey;
      }
    }
    .el-card {
      text-align: left;
      border-bottom: 1px solid $item-border-color;
    }
    .advert-area {
      width: 100%;
      padding-top: 15px;
      img {
        width: 100%;
        box-shadow: 0px 0px 20px lightgrey;
      }
    }
  }
}
</style>

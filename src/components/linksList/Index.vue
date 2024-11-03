<template>
  <div class="links-list">
    <el-card shadow="hover" v-if="pdata.length <= 0">
      <div class="content">
        <el-card class="tip-box-card" v-if="!isLoading">
          <div slot="header" class="clearfix">
            <h4>{{ $t('warmReminder') }}</h4>
          </div>
          <div class="no-result-tip">
            <img class="no-result-img" src="https://image.lovejade.cn/no-result.svg" :alt="$t('description')" />
            <div v-html="noResultTip"></div>
          </div>
        </el-card>
        <content-placeholder v-else slot="link-desc" :rows="placeholderRows" />
      </div>
    </el-card>
    <el-card v-else :class="cardClassName" shadow="hover" :key="item._id" v-for="item in pdata">
      <a v-if="isAbstract" :href="getAssembleRoute(item)" @click="onListClick" target="_blank" rel="bookmark">
        <LinkItem :pitem="item" :is-abstract="isAbstract"> </LinkItem>
      </a>
      <LinkItem v-else :pitem="item" :is-abstract="isAbstract"></LinkItem>
      <slot name="link-share"></slot>
    </el-card>
  </div>
</template>

<script>
import ContentPlaceholder from 'vue-content-placeholder'
import LinkItem from './LinkItem.vue'
import PLACEHOLDER_CONF from 'config/placeholder'

export default {
  name: 'LinksList',

  data() {
    return {
      placeholderRows: Object.freeze(PLACEHOLDER_CONF),
      noResultTip: '嘿，朋友，这儿暂未有相关数据；如果您想了解更多，请移步至<a class="no-result-tip-a" href="/">倾城之链</a>主页 。',
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

  methods: {
    getAssembleRoute(item) {
      return `/post/${item._id}`
    },

    onListClick() {
      this.$gtagTracking('list-entry', 'list')
      this.$adsConversionReport('from-list-entry')
    },
  },
}
</script>

<style media="screen" lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.main {
  .links-list {
    border-top: 1px solid $item-border-color;

    .single-moudle {
      aspect-ratio: 2.8 / 1;

      &:hover {
        background-color: $white-grey;
      }
    }

    .el-card {
      text-align: left;
      border-bottom: 1px solid $item-border-color !important;
    }
  }
}

@media screen and (max-width: $mobile-screen) {
  .main {
    .links-list {
      .single-moudle {
        aspect-ratio: auto;
        height: 22rem;

        .el-card__body {
          height: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <div class="links-list">
    <el-card shadow="hover" v-if="pdata.length <= 0">
      <div class="content">
        <el-card class="tip-box-card" v-if="!isLoading">
          <div slot="header" class="clearfix">
            <h4>{{ $t('warmReminder') }}</h4>
          </div>
          <div class="no-result-tip">
            <img
              class="no-result-img"
              src="https://image.nicelinks.site/no-result.svg"
              :alt="$t('description')"
            />
            <div v-html="$t('noResultTip')"></div>
          </div>
        </el-card>
        <content-placeholder v-else slot="link-desc" :rows="placeholderRows" />
      </div>
    </el-card>
    <el-card v-else :class="cardClassName" shadow="hover" :key="item._id" v-for="item in pdata">
      <router-link
        class="gtag-track"
        data-action="route-entry"
        data-category="list"
        data-label="route-entry"
        :to="getAssembleRoute(item)"
        v-if="isAbstract"
      >
        <LinkItem :item="item" :is-abstract="isAbstract"> </LinkItem>
      </router-link>
      <LinkItem v-else :item="item" :is-abstract="isAbstract"></LinkItem>
      <slot name="link-share"></slot>
    </el-card>
  </div>
</template>

<script>
import ContentPlaceholder from 'vue-content-placeholder'
import LinkItem from './LinkItem.vue'
import pageMixin from 'mixins/pageMixin.js'
import placeholderConfig from 'config/placeholder'

export default {
  name: 'LinksList',
  data() {
    return {
      placeholderRows: Object.freeze(placeholderConfig),
    }
  },

  mixins: [pageMixin],

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
  }
}
</style>

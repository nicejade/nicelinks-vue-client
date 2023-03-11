<template>
  <div class="operate-tabs" id="operate-tabs">
    <div class="nav-wrap">
      <a
        v-for="item in items"
        class="link"
        :class="{ active: item === activeName }"
        :href="getAssembleRoute(item)"
        :key="item"
        >{{ $t(item) }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperateTabs',

  data() {
    return {
      activeName: 'latest',
    }
  },

  computed: {
    items() {
      return ['latest', 'hottest', 'earliest']
    },
  },

  mounted() {
    this.activeName = this.$route.query.sort || this.activeName
  },

  methods: {
    getAssembleRoute(sort) {
      const path = this.$route.path
      return `${path}?sort=${sort}`
    },
  }
}
</script>

<style lang="scss">
@import './../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.operate-tabs {
  padding-top: 15px;
  .nav-wrap {
    @include flex-box-center(row, start, center);
    overflow: hidden;
    margin-bottom: -1px;
    :first-child {
      border-top-left-radius: 0.5rem;
    }
    :last-child {
      border-top-right-radius: 0.5rem;
    }
    .link {
      font-weight: 500;
      color: $link-title;
      padding: 1rem 1.5rem;
      border: 1px solid $moudle-border-color;
    }
    .link + .link {
      border-left: 0;
    }
    .active {
      color: $brand;
      border-bottom-color: $white;
    }
  }
}
</style>

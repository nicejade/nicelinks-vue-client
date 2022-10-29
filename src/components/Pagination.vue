<template>
  <div class="pagination">
    <ul class="pager">
      <li class="item" :class="{ disabled: item === '...' }" v-for="item in items">
        <a class="link" :class="{ active: item === page }" :href="getLinkPath(item)">{{ item }}</a>
      </li>
      <li class="item" style="width: 7rem;" v-if="isNext">
        <a class="link" :href="getLinkPath(page + 1)">下一页</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { PAGE_SIZE } from 'config/constant'
const PAGE_LIMIT = 6
export default {
  name: 'Pagination',

  props: {
    count: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    isNext() {
      const length = Math.ceil(this.count / PAGE_SIZE)
      return this.page < length
    },
    items() {
      const length = Math.ceil(this.count / PAGE_SIZE)

      if (length <= 1) return []

      if (length <= PAGE_LIMIT) {
        return this.range(1, length)
      }

      const maxLength = Math.min(length, PAGE_LIMIT)
      const even = maxLength % 2 === 0 ? 1 : 0
      const left = Math.floor(maxLength / 2)
      const right = length - left + 1 + even

      if (this.page > left && this.page < right) {
        const firstItem = 1
        const lastItem = length
        const start = this.page - left + 2
        const end = this.page + left - 2 - even
        const secondItem = start - 1 === firstItem + 1 ? 2 : '...'
        const beforeLastItem = end + 1 === lastItem - 1 ? end + 1 : '...'

        return [1, secondItem, ...this.range(start, end), beforeLastItem, length]
      } else if (this.page === left) {
        const end = this.page + left - 1 - even
        return [...this.range(1, end), '...', length]
      } else if (this.page === right) {
        const start = this.page - left + 1
        return [1, '...', ...this.range(start, length)]
      } else {
        return [...this.range(1, left), '...', ...this.range(right, length)]
      }
    },
  },

  mounted() {},

  methods: {
    range(from, to) {
      const range = []
      from = from > 0 ? from : 1
      for (let i = from; i <= to; i++) {
        range.push(i)
      }
      return range
    },

    getLinkPath(page) {
      page = parseInt(page)
      if (!page) return

      const path = this.$route.path
      const sort = this.$route.query.sort || 'latest'
      return sort === 'latest' ? `${path}?page=${page}` : `${path}?sort=${sort}&page=${page}`
    },
  },
}
</script>

<style lang="scss">
@import './../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

.pagination {
  @include flex-box-center(column, center, center);
  padding: 2rem 0;
  .pager {
    @include flex-box-center(row, center, center);
    :first-child {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
    :last-child {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    .item {
      width: 5rem;
      height: 5rem;
      border: 1px solid $moudle-border-color;
      list-style: none;
      &:hover {
        background-color: $white-grey;
      }
      .link {
        @include flex-box-center(row, center, center);
        width: 100%;
        height: 100%;
        color: $link-title;
        font-size: $font-medium;
        font-weight: 500;
      }
      .active {
        pointer-events: none;
        cursor: not-allowed;
        border-radius: 0;
        color: $white;
        background-color: $brand;
      }
    }
    .item + .item {
      border-left: 0;
    }
    .disabled {
      cursor: not-allowed;
      filter: alpha(opacity=65);
      -webkit-box-shadow: none;
      box-shadow: none;
      opacity: 0.65;
      background-color: $border-grey;
    }
  }
}

@media screen and (max-width: $mobile-screen) {
  .pagination .pager .item {
    width: 4rem;
    height: 4rem;
  }
}
</style>

<template>
  <aside class="sidebar-aside">
    <h2 class="aside-widget-title">{{ $t('friendsLinks') }}</h2>
    <ul class="friends-widget">
      <li v-for="item in friendsList" class="item">
        <a
          class="friend-link text-ellipsis"
          :href="item.path + '?ref=nicelinks.site'"
          :key="item.path"
          rel="external noopener"
          target="_blank"
          >{{ item.title }}
        </a>
      </li>
    </ul>
    <router-link to="/friends" @click="onFriendshipClick" class="other-friends">
      🤝更多友情链接
    </router-link>
  </aside>
</template>

<script>
export default {
  name: 'Friends',

  props: {
    friendsList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  methods: {
    onFriendshipClick() {
      this.$gtagTracking('other-friends', 'aside')
    },
  },
}
</script>

<style scoped lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.friends-widget {
  @include flex-box-center(row, space-between, center);
  flex-wrap: wrap;
  margin: 1rem 1rem;
  .item {
    @include flex-box-center(row, start, center);
    width: 50%;
    padding: 0.5rem 0;
    .friend-link {
      font-size: $font-small;
      color: $common-link;
      &:hover {
        color: $common-link-hover;
        font-weight: 600;
      }
    }
    &:nth-child(even) {
      @include flex-box-center(row, end, center);
    }
  }
}

.other-friends {
  display: inline-block;
  width: 100%;
  height: 2rem;
  margin: 1rem auto;
  font-size: $font-large;
  color: $jade;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
  user-select: none;
  text-transform: uppercase;
  text-shadow: -15px 5px 20px $producthunt;
  transition: all 0.3s ease-out;
}

.other-friends:hover {
  text-shadow: 0px 6px 20px $producthunt;
}
</style>
